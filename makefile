
docs:
	cd prob; \
	jsdoc -c conf.json; \
	cd ../tol; \
	jsdoc task.js -d docs/;
