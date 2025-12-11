# vim:set ft=docker/dockerfile:1.8

FROM debian:trixie

COPY dist /dist
COPY docker/install.sh /install.sh
RUN /install.sh

EXPOSE 80

WORKDIR /dist
CMD ["/dist/tr-coder"]
