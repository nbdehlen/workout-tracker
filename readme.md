# Workout tracker

Highly detailed workout tracking. Available as a mobile app and Rest-API.

## Instructions

### Android App

Download app.release-apk:
https://github.com/nbdehlen/workout-tracker/tree/master/mobile

### Rest-API

https://workouttracker-api.herokuapp.com/api-docs/#/

### Admin Dashboard

https://workouttracker-dashboard.herokuapp.com/

### Run locally

Branch: develop

Mobile:
Android studios with android emulator API version 29.
command: npx react-native run-android

Dashboard:
command: npm start

## Tech stack

Mobile: React Native, TypeScript, styled-components
Backend: Express, MongoDB

## Idea

Throughout the years I have typically saved my workout logs in excel files or text files on a desktop.
For me this came with some drawbacks:
No ability to log workouts on the go and resorting to taking temporary notes during workouts
in order to later input them into my desktop workout log.

## Goal

To be able to log a wide variety of workouts with a high level of detail on both android and desktop (Rest-API currently).

## Purpose

I started looking into the available workout apps on android. There were certainly a lot of workout apps
but none with the level of customization I wanted and with the option to log workouts on a desktop or access to the API.

## Target group

This app is for anyone who require a high level of detail in their workout log and the ability to access the data from both their
mobile and desktop.
