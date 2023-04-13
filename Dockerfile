FROM node:14-alpine As build

COPY package*.json ./

RUN rm -rf node_modules && rm package-lock.json
RUN npm cache clean --force
RUN npm install
COPY apps/backend ./apps/backend
COPY libs ./libs
COPY tsconfig.base.json .

RUN npx nx build backend

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /cpd-ppg-map-workspace

COPY --from=build /cpd-ppg-map-workspace/apps /cpd-ppg-map-workspace/apps
COPY --from=build /cpd-ppg-map-workspace/libs /cpd-ppg-map-workspace/libs
COPY --from=build /cpd-ppg-map-workspace/dist /cpd-ppg-map-workspace/dist
COPY --from=build /cpd-ppg-map-workspace/node_modules /cpd-ppg-map-workspace/node_modules
COPY --from=build /cpd-ppg-map-workspace/package.json /cpd-ppg-map-workspace/package.json
COPY tsconfig.base.json /app

CMD ["node", "dist/apps/backend/main.js"]
