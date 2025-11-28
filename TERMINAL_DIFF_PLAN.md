# Terminal Output Diffing Implementation Plan

## Problem
Appending content causes the entire screen to clear and rewrite, scrolling back up unnecessarily. This creates a jarring user experience.

## Root Cause
The `onRender` method in `ink.tsx` uses `log.clear()` and rewrites the entire output, even when only the bottom portion has changed.

## Solution: Intelligent Line-Based Diffing

### Core Algorithm
1. Split old and new output into line arrays
2. Find the longest common prefix (unchanged lines from top)
3. Calculate minimal cursor movement needed
4. Only rewrite changed lines

### Implementation Steps

#### 1. Add Diff Utility Function
Create `diffLines(oldOutput: string, newOutput: string)` that returns:
- `commonPrefixLines`: Number of unchanged lines from top
- `linesToErase`: Number of lines to erase from cursor position
- `newContent`: Only the content that needs to be written

#### 2. Modify `onRender` Method
Replace full clear/rewrite logic with:
- Compare `output` with `this.lastOutput`
- If only bottom lines changed, move cursor up to first changed line
- Erase from cursor to end of screen
- Write only new/changed content

#### 3. Key ANSI Escape Sequences Needed
- `ansiEscapes.cursorUp(n)` - Move cursor up n lines
- `ansiEscapes.eraseDown` - Clear from cursor to end of screen
- `ansiEscapes.cursorTo(0)` - Move cursor to column 0

#### 4. Edge Cases to Handle
- Terminal width changes (already handled by `resized`)
- Output shorter than previous (erase extra lines)
- Static output changes (keep existing full rewrite)
- Screen reader mode (keep existing behavior)
- CI mode (keep existing behavior)

### Pseudocode

```typescript
function diffLines(oldOutput: string, newOutput: string) {
  const oldLines = oldOutput.split('\n');
  const newLines = newOutput.split('\n');
  
  // Find common prefix
  let commonPrefix = 0;
  while (commonPrefix < Math.min(oldLines.length, newLines.length) &&
         oldLines[commonPrefix] === newLines[commonPrefix]) {
    commonPrefix++;
  }
  
  return {
    commonPrefixLines: commonPrefix,
    oldLinesCount: oldLines.length,
    newLinesCount: newLines.length,
    changedContent: newLines.slice(commonPrefix).join('\n')
  };
}

function renderDiff(oldOutput, newOutput, oldHeight) {
  const diff = diffLines(oldOutput, newOutput);
  
  if (diff.commonPrefixLines === diff.newLinesCount && 
      diff.newLinesCount === diff.oldLinesCount) {
    return; // No changes
  }
  
  // Move cursor to first changed line
  const linesToMoveUp = oldHeight - diff.commonPrefixLines;
  const moveUp = linesToMoveUp > 0 ? ansiEscapes.cursorUp(linesToMoveUp) : '';
  
  // Clear from cursor down and write new content
  stdout.write(moveUp + ansiEscapes.cursorTo(0) + ansiEscapes.eraseDown + diff.changedContent);
}
```

### Files to Modify
- `pkg/ink/src/ink.tsx` - Add `diffLines` method and modify `onRender`

### Testing Strategy
1. Test appending single line
2. Test appending multiple lines
3. Test modifying middle content (should still work, may not be optimal)
4. Test shrinking output
5. Test with static output
6. Test terminal resize

### Performance Considerations
- Diff calculation is O(n) where n = min(old lines, new lines)
- Only applies in non-debug, non-CI, non-screen-reader modes
- Throttling already in place, diff adds minimal overhead

### Backward Compatibility
- Only affects normal terminal rendering mode
- Debug, CI, and screen reader modes unchanged
- Falls back to full rewrite if diff is complex
