# vim:set ft=docker/dockerfile:1.8

FROM debian:trixie

LABEL org.opencontainers.image.source="https://github.com/tokenring-ai/monorepo"

COPY dist /dist
COPY docker/install.sh /install.sh
ARG TARGETARCH
RUN cp "/dist/tokenring-linux-${TARGETARCH}" /dist/tokenring \
  && /install.sh \
  && rm -f /dist/tokenring-linux-*

EXPOSE 80

WORKDIR /dist
CMD ["/dist/tokenring"]
