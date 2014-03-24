TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 1000
MOCHA_OPTS =

install:
	@npm install --registry=http://r.cnpmjs.org --disturl=http://dist.cnpmjs.org

jshint:
	@./node_modules/.bin/jshint .

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov cov:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)
	@./node_modules/.bin/cov coverage
	@-$(MAKE) check-coverage

check-coverage:
	@./node_modules/.bin/istanbul check-coverage \
		--statements 100 \
		--functions 100 \
		--branches 100 \
		--lines 100

test-all: install jshint test cov

autod: install
	@./node_modules/.bin/autod -w
	@$(MAKE) install

contributors:
	@./node_modules/.bin/contributors -f plain -o AUTHORS

.PHONY: test
