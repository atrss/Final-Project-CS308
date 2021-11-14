
docs:
	cd prob; \
	jsdoc -c conf.json; \
	cd ../tol; \
	jsdoc -c conf.json;
