'use strict';

var expect   = require('chai').expect;
var sinon    = require('sinon');
var UserBase = require('../mocks/user');
var Builder  = require('../../lib/builder');

describe('Builder', function () {

  var builder, rules;
  beforeEach(function () {
    rules = [];
    builder = new Builder(rules);
  });

  describe('Builder#create', function () {

    it('creates a new Builder', function () {
      var b = Builder.create(rules);
      expect(b)
        .to.be.an.instanceOf(Builder)
        .and.have.property('_rules', rules);
    });

  });

  describe('constructor', function () {

    it('stores the target for new rules', function () {
      expect(builder)
        .to.have.property('_rules')
        .that.equals(rules);
    });

  });

  describe('#a / #an', function () {
    ['a', 'an'].forEach(function (method) {

      it('checks that the User is a ctor w/ #can', function () {
        expect(builder[method]).to.throw(/Invalid user/);
        expect(builder[method].bind(builder, new UserBase())).to.throw(/Invalid user/);
      });

      it('stores the User', function () {
        expect(builder.a(UserBase)).to.have.property('_user', UserBase);
      });

    });
  });

  describe('#to', function () {

    it('sets the method', function () {
      expect(builder.to('write')).to.have.property('_method', 'write');
    });

    it('returns the builder for chaining', function () {
      expect(builder.to()).to.be.an.instanceOf(Builder);
    });

    it('has method properties for extra sugar', function () {
      expect(builder.to.write)
        .to.be.an.instanceOf(Builder)
        .and.have.property('_method', 'write');
    });

  });

  describe('rule setters', function () {

    describe('#always', function () {

      it('pushes a new rule with test = true', function () {
        builder.always();
        expect(rules)
          .to.have.property(0)
          .with.property('test', true);
      });

    });

    describe('#never', function () {

      it('pushes a new rule with test = false', function () {
        builder.never();
        expect(rules)
          .to.have.property(0)
          .with.property('test', false);
      });

    });

    describe('#when', function () {

      it('pushes a new rule with test = fn', function () {
        var fn = function () {};
        builder.when(fn);
        expect(rules)
          .to.have.property(0)
          .with.property('test', fn);
      });

    });

  });

});