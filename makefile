install: 
	npm ci

genDiff: 
	node bin/genDiff.js

publish:
	npm publish --dry-run

make lint:
	npx eslint .

make test:
	npm test