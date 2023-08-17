# ![](config/assets/logo.svg) Appsemble

> The app building platform

## Table of Contents

- [Usage](#usage)
  - [Live Environments](#live-environments)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
    - [CLI Login](#cli-login)
    - [Registering an Organization](#registering-an-organization)
    - [Publishing Blocks](#publishing-blocks)
    - [Publishing App templates](#publishing-app-templates)
  - [Development Server](#development-server)
  - [Tests](#tests)
  - [Building](#building)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Usage

These are instructions for developing the Appsemble core platform. Production setup instructions can
be found in [here](packages/studio/pages/docs/docs/04-deployment/helm.md).

### Live Environments

Our production environment is available on [appsemble.app](https://appsemble.app).

Our staging environment is available on
[staging.appsemble.review](https://staging.appsemble.review). This environment hosts the latest
changes in the `main` branch. This environment is reset every night at 04:00 AM UTC.

For each of our internal merge requests a review environment is started at
`${CI_MERGE_REQUEST_IID}.appsemble.review`.

### Requirements

**Minimum Hardware Requirements**

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| CPU      | 1 GHz   | >2 GHz      |
| CPUs     | 1       | 2>          |
| RAM      | 12GB    | 16GB>       |
| Disk     | 3 GiB   | >           |

**Software Requirements**

In order to run the Appsemble project in development mode on Linux, macOS or Windows, the following
must be installed.

- [Docker][]
- [Docker Compose][]
- [NodeJS 18][nodejs]
- [Yarn][]

### Getting started

Clone and setup the project.

> Note: your CLI should have elevated privileges when setting up and starting the app

```sh
git clone https://gitlab.com/appsemble/appsemble.git
cd appsemble
yarn
```

The project requires a PostgreSQL database. This project contains a Docker Compose configuration to
spin up a preconfigured database with ease.

```sh
docker compose up -d
```

The project can be served using the following command.

```sh
yarn start
```

To see additional options, run the following command.

```sh
yarn start --help
```

A new account can be registered by going to `http://localhost:9999/register`. Later you can login on
`http://localhost:9999/login`. If you use email registration to register an account, the email
containing the verification link will be printed in the server logs. You need to click this link in
order to use your account.

#### CLI Login

To login using the Appsemble CLI, run the following command.

```sh
yarn appsemble login
```

> Note: when using Windows Subsystem for Linux (WSL), this command is **unsupported**. The
> workaround for this is manually creating OAuth2 credentials at
> `http://localhost:9999/settings/client-credentials` and passing them to the CLI by setting the
> `APPSEMBLE_CLIENT_CREDENTIALS` environment variable.
> [More details](https://gitlab.com/appsemble/appsemble/-/issues/958#note_1299145503).

This will open Appsemble studio in a new window in your browser. A panel will pop up where you must
select the permissions you need. You will need to select at least _blocks:write_,
_organizations:write_ and _apps:write_ to complete the steps below. Clicking confirm creates an
OAuth2 access token, which is required in order to publish blocks and apps. Click register and your
OAuth2 client credentials will be shown. This will be required when you proceed with the publishing
blocks and apps steps below.

#### Registering an Organization

To get started developing locally, an Appsemble organization identified through id: `appsemble`
needs to be created. This organization can be created either in Appsemble Studio, or using the
following CLI command.

```sh
yarn appsemble organization create --name Appsemble appsemble
```

#### Publishing Blocks

After logging in to the CLI, Appsemble blocks can be published locally by running the following
command.

```sh
yarn appsemble block publish blocks/*
```

If prompted, select the OAuth2 credential you created earlier to proceed. You will now see the
published blocks in the `Block store` page.

Any block that is found within the workspaces listed in `package.json` will be hot-reloaded. More
information about block development and hot-reloading can be found
[here](https://appsemble.app/docs/development/developing-blocks).

#### Publishing App templates

In order for users to create apps from within the Appsemble Studio, existing apps that can be used
as a starting point must be marked as templates. This can be done using the Appsemble CLI, after
logging in. To publish these apps, run the following command.

```sh
yarn appsemble app create --context development apps/*
```

The published apps will be displayed on the `App store` page.

### Development Server

The development server can create an app from a specified folder containing an `app-definition.yml`
file. It will check what blocks are needed for the app and will try to load them from the local
workspaces, listed in the `package.json` file in the root of the project, if they are present. This
way, all default Appsemble blocks shipped with Appsemble are loaded automatically.

Once the development server is started, making a change to a block’s code or styles will reflect in
the browser immediately after refreshing the page, without the need of increasing the block’s
version. Running docker database containers, creating a user account and creating an organization
are not needed.

App resources will be stored locally in the `/packages/cli/data.json` file. App assets and block
assets will be served from the local file system.

The development server will fetch all remote repositories listed in the `.git/config` file in the
root of the project. It will fetch blocks that are missing from the workspaces from the
corresponding remote repository. These are typically third-party or proprietary blocks. It will
check only the main and master branches, to fetch blocks from other branches run:

```sh
git checkout <remote-name>/<branch-name> -- <path-to-block-directory>
```

Supported remote repositories can be inspected by running:

```sh
git remote -v
```

New remote repositories can be added to the git configuration file by running:

```sh
git remote add <remote-name> <remote-url>
```

To fetch all remote repositories run the following command:

```sh
git fetch --all
```

Apps can also be fetched from a remote repository manually by running the following command in the
root of the project:

```sh
git checkout <remote-name>/<branch-name> -- <path-to-app-directory>
```

The development server can be started by running:

```sh
yarn appsemble serve <path-to-app-directory>
```

This will serve the app on `http://<app-name>.localhost:9999`

A different port can be specified with the `--port` parameter.

### Tests

Tests can be run using the following command.

```sh
yarn test
```

The tests are ran using jest, meaning all [jest CLI options][] can be passed.

By default, database tests are run against the database as specified in
[docker-compose.yml](docker-compose.yml). The database can be overridden by setting the
`DATABASE_URL` environment variable. Note that this should **not** include the database name.
Multiple test databases are created at runtime.

```sh
DATABASE_URL=postgres://admin:password@localhost:5432 yarn test
```

### Building

The resulting Docker image can be built using the Docker CLI.

```sh
docker build --tag appsemble .
```

## Contributing

Please read our [contributing guidelines](./CONTRIBUTING.md).

## Security

Please read our [security policy](./SECURITY.md).

## License

[LGPL-3.0-only](./LICENSE.md) © [Appsemble](https://appsemble.com)

[docker]: https://docker.com
[docker compose]: https://docs.docker.com/compose
[jest cli options]: https://jestjs.io/docs/en/cli
[nodejs]: https://nodejs.org
[yarn]: https://yarnpkg.com
