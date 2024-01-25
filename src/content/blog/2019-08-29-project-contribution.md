---
title: Team Contribution Guide
published: false
draft: false
tags: ["learning", "contribution", "support", "dev"]
date: 2019-08-29
description: ""
pubDate: "2019-08-29"
heroImage: ""

---

The following guide is a modified version that we use at Clear Labs dev team. It's a starting point for team dev work and contribution.

When contributing to this repository, please first make sure a ticket is filed for the change, whichever ticketing system is used.
At Clear Labs, we use JIRA, but the same can be done for Github issues, or any other ticketing system.

Please note we have a code of conduct. Please follow it in all your interactions with the project.

## How To Contribute

When beginning development, you will need to create a git branch. See [Git Branches](#git-branches)
for more information about naming your git branch.

### Git Branches

The app has three main branches.

- `develop` ➡ Maps to the Development environment
- `main` ➡ Maps to the Production environment
- `release` ➡ Maps to the released versions on the Production environment (we have slow release cycles, )

In development, a developer will create a feature branch, named after a ticket number, e.g. `ENG-2120`.
When the ticket is ready to test, the develop will create a pull request (PR) against the `develop` branch.

When a set of features are completed, a PR will be created between the `develop` branch and the `master` branch.
Before the PR is merged, the developer needs to tag the `develop` branch with the proper version tag.
QA will approve this PR when they are ready to upgrade the QA environment with the developer's latest changes.

When a set of features are tested, a develop needs to create a PR between the `main` and `release` branch.
When QA approves this PR, the developer will tag and merge this PR.

#### Naming Scheme for CI

Name your branches with these prefixes. This will test and build the application in our CI.

- ENG-\*
- hotfix-\*
- feature-\*

### Commits

All commits need to contain a ticket number. If a commit does not contain a ticket number, the push to Bitbucket will not be allowed.

Example:

> git commit -m "ENG-2120 resolve breaking change from GraphQL API for test runs"
> In case a commit does not contain a ticket number, you have a few strategies to resolve this:

- rebase against `develop`. `git rebase develop -i`
- if it is the latest commit, you can amend it. `git commit --amend`

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build. Please use the `.gitignore` file for ignoring unnecessary files. Make sure all commit messages have a JIRA ticket tag. e.g. `git commit -m "ENG-100 commit message"`
1. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters. If there are changes to development, please update the [development guide](/docs/Development.md).
1. If creating a PR to `master` branch, tag the `develop` branch with a bump in the version. The same goes for a PR to `release` by tagging `main`. For `develop` ➡ `main` branch, take the base version, add a hyphen, and concat the date (mm/dd) plus an incrementor. e.g. v1.6.0.0.1-Feb.01.1 For `master` ➡ `release-candidate` branch, give the version. e.g. v1.6.1. For additional information about versioning, please refer to the [next section](#version-tags).
1. JIRA should add a list of commits going into this PR. If not, please add them with the JIRA ticket tag.
1. You may merge the Pull Request in once you have the sign-off of one other developer, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

#### Version Tags

We follow [semver](https://semver.org/) with the following:

- Preleases are used for git tagging between `develop` and `master` branches. This is denoted by an _alpha-{number}_, e.g. v0.9.13.alpha-1
- Releases are versioned without prerelease words, e.g. v0.9.13
- For hotfixes, bump the patch version. e.g. v0.9.13 -> v0.9.14

> Upon later inspection, we no longer use prereleases.

**🚨 Deprecation Notice**
Moving forward, release-candidate will be deprecated in favor of using `main` without `release`.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the Engineering Manager. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [https://contributor-covenant.org/version/1/4][version]

[homepage]: https://contributor-covenant.org
[version]: https://contributor-covenant.org/version/1/4/
