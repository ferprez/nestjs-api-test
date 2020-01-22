dev:
	cd server; npm run start

dev:
	cd server; npm run start:dev

build:
	cd server; npm run build

deploy:
	cd server; firebase deploy --only functions

deployDev:
	cd server; npm run build; firebase serve --only functions

