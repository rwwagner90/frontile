// @ts-ignore
import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import 'qunit-dom';

// @ts-ignore
setApplication(Application.create(config.APP));

start();
