FROM hayd/alpine-deno:1.1.1

EXPOSE 3030

WORKDIR /app

USER deno

ADD ./src .

RUN deno cache deps.ts
RUN deno cache main.ts

CMD ["run", "--allow-read", "--allow-env","--allow-net", "main.ts"]
