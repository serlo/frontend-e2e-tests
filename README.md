# frontend-e2e-tests

integration tests for serlo.org

```sh
git clone https://github.com/serlo/frontend-e2e-tests.git
cd frontend-e2e-tests
npm install
npm run test
```

output should look something like that:

![grafik](https://user-images.githubusercontent.com/13507950/210520199-ad502693-8f84-4956-9417-f750a243911d.png)

Tests are written with Playwright (wrapped by CodeceptJS), extensive documentation can be found at https://codecept.io/helpers/Playwright/

To run a single test, use `--grep`:

```sh
npm run test --grep "Quickbar"
```
