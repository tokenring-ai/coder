import {ModelConfig} from "@token-ring/ai-client/ModelRegistry";
import {PersonaConfig} from "@token-ring/chat/ChatService";

export interface CoderConfig {
    defaults: {
        model: string;
        resources?: string[];
        selectedFiles?: string[];
        persona: string;
        tools?: string[];
    };
    personas: Record<string, PersonaConfig>
    models: Record<string, ModelConfig>;
    indexedFiles: Array<{
        path: string;
    }>;
    watchedFiles: Array<{
        path: string;
        include: RegExp;
    }>;
    resources: Record<string, ResourceConfig>;
}


export interface ResourceConfig {
    type: 'fileTree' | 'repoMap' | 'wholeFile' | 'shell-testing';
    name?: string;
    description: string;
    items?: Array<{
        path: string;
        include?: RegExp;
        exclude?: RegExp;
    }>;
    command?: string;
    workingDirectory?: string;
}