---
date: 2021-08-11
description: ""
draft: false
heroImage: ""

pubDate: "2021-08-11"
published: false
tags: ["learning", "react"]
title: Feature Management
---

## Introduction

A feature flag is a decision point in your code that can change the behavior of your application. Feature flags can either be temporary or permanent.

Temporary flags are often used to safely deploy changes to your application or to test new behaviors against old ones. After a new behavior is being used by 100% of your users, the flag is intended to be removed.

Permanent flags give you a way to control the behavior of your application at any time. You might use a permanent flag to create a kill-switch or to reveal functionality only to specific users.

Feature flags are context sensitive. The code path token can change based on the context provided; for example, the user's identity, the plan they've paid for, or any other data.

Feature flags can be used to control which users can see each change. This decouples the act of deploying from the act of releasing.

## What do we do today

We have the ability to switch temp flags as kill switch for all customers (new field in result analytics). The permanent flags are controlled per customer (e.g. env mapping). A sub-group of those permanent flags control company integrations with third party services (e.g. Terra).

## What are we lacking

What we don’t have is fine control of flags for rollout — using context to switch on/off flags by user, company, or other groups. When introducing new flags, we don’t have a standardized way in storing them in the same place. See companyFeatureToggles vs. companyIntegrations vs. featureFlags. We don’t highlighting flag dependencies. Lastly, permanent flags are limited to a per-company basis.

## Definitions

- Safety valves are permanent feature flags that you can use to quickly disable or limit nonessential parts of your application to keep the rest of the application healthy.
- Kill Switches are permanent feature flags that allows you to quickly turn it off a feature if it's performing poorly.
- Circuit Breakers have the ability to switch off feature flags if they meet certain monitoring criteria.
- An Operational Feature Flag are flags around features invisible to customers, such as a new backend improvement or infrastructure change. Operational flags give DevOps teams powerful controls that they can use to improve availability and mitigate risk.

## Feature Flag Management Platforms

- LaunchDarkly
- Split
- CloudBees
- Deployments

## Types of Deployments

There are different types of deployments:

- Canary Releases - User groups who would like to opt in
- Ring Deployments - Different user segments at a time - e.g. beta or power users
- Percentage-based Deployments - Start with low percentage, then move to higher. For operational changes

Each of these can be implemented using feature flags.

Feature flags and blue/green deploys are complementary techniques. Although there are areas of overlap, each approach has distinct benefits, and the best strategy is to use both.

## Testing

It isn’t necessary (or even possible) to test every combination of feature flags. Testing each variation of a flag in isolation (using default values for the other flags) is usually enough, unless there’s some known interaction between certain flags.

## Library Code

Another decision that affects testing is whether you should use feature flags in reusable library code. I think the answer is no—flags are an application-level concern, not a library concern.

## Feature Flag Clean-up

Cleaning up flags aggressively is the key to preventing technical debt from building up. There’s no royal road to flag cleanup, but there are some processes that make it manageable.

A stale flag is a temporary flag that is no longer in use and has not been cleaned up. Too many stale flags are a form of technical debt and an antipattern that you should avoid.

## Documentation

Document changes It’s good practice to maintain a log of flag updates. It’s even more helpful to leave a comment with every change. When something is going unexpectedly wrong, being able to quickly see if anything has changed recently (and why it did) is an invaluable asset.

Name your flags well It’s also important to help your team understand what flags are for as easily as possible. So, adopt a naming convention that makes it clear at first glance what a flag is for, what part of the system it affects, and what it does.

## Configuration Management

Feature management platforms solve many of these change management problems, but I still do not recommend moving configuration data into feature flags.

Configuration parameters are typically stored in files, environment variables, or services like Consul or Redis. As services become more complex, configuration management becomes a real concern. Tasks like versioning configuration data, rolling back changes, and promoting configuration changes across environments become cumbersome and error prone.

Rather than migrate all configuration data into feature flags, I recommend introducing feature flags selectively on top of whatever configuration management mechanism is in place (files, environment variables, etc.). These flags should be introduced only on an as-needed basis. For example, imagine that you’re trying to manage a database migration via feature flags.

If you had managed your migration by moving the entire database configuration into a feature flag, perhaps by creating a multivariate database-configuration flag, you’d need to keep the flag in place permanently.

## Design for Failure

Design multiple layers of redundancy. When you write code you must consider what should happen if the feature flag system fails to respond. Most feature flag APIs include the ability to specify a default option—what is to be served if no other information is available. Ensure that you have a default option and that your defaults are safe and sane.

## Flag Distribution via a Networked System

In any networked system there are two methods to distribute information. Polling is the method by which the endpoints (clients or servers) periodically ask for updates. Streaming, the second method, is when the central authority pushes the new values to all the endpoints as they change.

<table>
    <tr>
        <td>Technique</td>
        <td>Pros</td>
        <td>Cons</td>
    </tr>
    <tr>
        <td>Polling</td>
        <td>Simple, Easily Cached</td>
        <td>Inefficient. All clients need to connect momentarily, regardless of whether there is a change. Changes require roughly twice the polling interval to propagate to all clients. Because of long polling intervals, the system could create a “split brain” situation, in which both new flag and old flag states exist at the same time.</td>
    </tr>
    <tr>
        <td>Streaming</td>
        <td>Efficient at scale. Each client receives messages only when necessary. Fast Propagation. Changes can be pushed out to clients in real time.</td>
        <td>Requires the central service to maintain connections for every client. Assumes a reliable network.</td>
    </tr>
</table>

## Relay Proxy

> For those customers that have the need for another layer of redundancy on top of the four layers provided by our core service (multiple AWS availability zones, the Fastly CDN, local caching, and default values), we also offer the LaunchDarkly relay proxy (formally known as LD-relay). LD-relay is a small application in a Docker container that can be deployed in your own environment, either in the cloud of your choice or on premise in your datacenter(s).

- [Designing for Failure to Avoid Disaster](https://launchdarkly.com/blog/designing-for-failure-to-avoid-disaster/)

> The Relay Proxy is a small Go application that connects to the LaunchDarkly streaming API and proxies that connection to clients within an organization's network.  
> We recommend that customers use the Relay Proxy if they are on an Enterprise plan and primarily use feature flagging in server-side applications. The Relay Proxy adds an additional layer of redundancy in the case of a LaunchDarkly outage.

- Link to [Relay Proxy](https://docs.launchdarkly.com/home/relay-proxy)
