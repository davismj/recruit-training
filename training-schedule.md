(1) Getting Started

We're going to build a quick CRUD application that we're going to use for development. The app will list contacts. We're going to create a contact model.

(2) Consuming Plugins

We're going to install i18n and add some translations. Then, we're going to install validation and hook up validation. Finally we're going to translate validation messages.

(3) Creating Plugins

We're going to create a couple value converters and custom elements. We're not going to create binding behaviors as they are rare. We're not going to create custom attributes because they're just a simpler case of custom elements. We're going to briefly discuss the steps to wrap these components as a plugin, since a feature is just a local plugin.

(4) Wrapping 3rd-party Components

We're going to wrap three components from the leaflet library: Map, marker, and popup. We'll also briefly cover how to wrap a react component.

(5) Services and API Integration

We're going to create a clock and a locale service to learn about the power of services. Then, we'll create a service for our contact API.

(6) Authentication and Security

First, we're going to briefly discuss the illusion security in an SPA. Then, we'll create a comprehensive authentication service to integrate with an openid-connect API. Finally, we'll use the service to selectively load public and authorized app roots and protect routes with an AuthStep.

(7) App Architecture

We're going to briefly summarize the cross-comoponent strategies available to us and when each strategy is most applicable. We're also going to create a Notification component.

(8) Testing

We're going to write unit tests for our components.

(9) Tooling

We're going to look at what it takes to deploy to production.
