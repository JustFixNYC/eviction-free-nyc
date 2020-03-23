# Eviction Free NYC!

This site was built in conjunction with the [Right to Counsel Coalition](https://www.righttocounselnyc.org/) as a new resource for NYC tenants to navigate the new RTC law, learn how to respond to an eviction notice, and access legal aid services.

This site is built on top of [GatsbyJS](https://www.gatsbyjs.org/). 

![product shots](https://i.imgur.com/TVZV2Qe.jpg)


### Getting the site up-and-running

Before installing anything, you will want to check out the
repository and create an `.env.development` file from the
template:

```
cp .env.development.sample .env.development
```

Now edit `.env.development` as needed.

You can now develop using either the local installation of
node on your computer, or via Docker.

#### Option 1: Developing with your local installation of node

Make sure that you have `node >= v10` and `yarn >= 1.17` running. In a terminal window, type `node --version` and hit ENTER, then `yarn --version` and hit ENTER to get this info. You'll then need to install gatsby:

```
yarn global add gatsby-cli
```

Once your environment is setup, you'll need to download libraries (make sure you're in the root directory):
```
yarn install
```
then simply use the Gatsby CLI to start your dev environment!
```
gatsby develop
```

#### Option 2: Developing with Docker

Get [Docker][] and run:

```
docker-compose run app yarn
docker-compose up
```

Then visit http://localhost:8000/ in your browser and you
should be good to go.

[Docker]: https://docker.com/

### Deploying

See the [deploy instructions](https://www.gatsbyjs.org/tutorial/part-one/#deploying-gatsbyjs-websites) on the GatsbyJS site to decide what's best for you!

### Attribution

The starter for this site was [gatsby-contentful-i18n](https://github.com/mccrodp/gatsby-contentful-i18n), built by [mccrodp](https://github.com/mccrodp)! Many thanks!

Also a huge thanks to the team at [Contentful](https://www.contentful.com/) for their generous support.

![thanks contentful!](https://www.contentful.com/assets/images/badges/dark.png)

We use BrowserStack Live to make sure that our sites work across browsers, operating systems, and devices.

![BrowserStack](https://www.browserstack.com/images/layout/browserstack-logo-600x315.png)

## License

JustFix.nyc uses the GNU General Public License v3.0 Open-Source License. See `LICENSE.md` file for the full text.

## Code of Conduct

Read about JustFix's code of conduct as an organization on our [Mission page](https://www.justfix.nyc/our-mission/), as well as on the Right to Counsel's [About page](https://www.righttocounselnyc.org/about)
