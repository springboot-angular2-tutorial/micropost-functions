# micropost-functions

This project manages lambda functions by using [Serverless](https://serverless.com/).

## Getting Started

Configure.

```
cp .envrc.example .envrc
vi .envrc
direnv allow
```

Install dependencies.

```
npm install -g yarn serverless
yarn install
```

Deploy.

```
sls deploy -v
```

Run functions.

```
sls invoke -f notifyToSlack -l
```

## Related Projects

* [Angular2 app](https://github.com/springboot-angular2-tutorial/angular2-app)
* [Android app](https://github.com/springboot-angular2-tutorial/android-app)
* [Server provisioning by Ansible and Packer](https://github.com/springboot-angular2-tutorial/micropost-provisionings)
* [Infrastructure by Terraform](https://github.com/springboot-angular2-tutorial/micropost-formation)

## License

[MIT](/LICENSE)
