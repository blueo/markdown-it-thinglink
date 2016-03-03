// Process @[thinglink](thinglinkId)

'use strict';

function thinglink_embed(md) {
  function thinglink_return(state, silent) {
    /*eslint-disable no-unused-vars */
    var
    serviceEnd,
    serviceStart,
    thinglinkId = '',
    tokens,
    token;
    /*eslint-enable */

    // When we add more services, (thinglink) might be (thinglink|otherservice), for example
    var EMBED_REGEX = /@\[(thinglink)\]\([\s]*(.*?)[\s]*[\)]/im;


    if (state.src.charCodeAt(state.pos) !== 0x40/* @ */) {
      return false;
    }
    if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) {
      return false;
    }

    var match = EMBED_REGEX.exec(state.src);

    if (!match) {
      return false;
    }

    if (match.length < 3) {
      return false;
    }


    var service = match[1];
    thinglinkId = match[2];

    // If the thinglinkId field is empty, regex currently make it the close parenthesis.
    if (thinglinkId === ')') {
      thinglinkId = '';
    }

    serviceStart = state.pos + 2;
    serviceEnd = md.helpers.parseLinkLabel(state, state.pos + 1, false);

      //
      // We found the end of the link, and know for a fact it's a valid link;
      // so all that's left to do is to call tokenizer.
      //
    if (!silent) {
      state.pos = serviceStart;
      state.posMax = serviceEnd;
      state.service = state.src.slice(serviceStart, serviceEnd);
      var newState = new state.md.inline.State(
        service,
        state.md,
        state.env,
        tokens = []
        );
      newState.md.inline.tokenize(newState);

      token = state.push('interaction', '');
      token.thinglinkId = thinglinkId;
      token.service = service;
      token.level = state.level;
    }

    state.pos = state.pos + state.src.indexOf(')');
    state.posMax = state.tokens.length;
    return true;
  }

  return thinglink_return;
}

function tokenize_thinglink(thinglinkId) {
  var embedStart = '<img style="max-width:100%" src="';
  var embedEnd = '" class="alwaysThinglink"/>';
  return embedStart + thinglinkId + embedEnd;
}

function tokenize_interaction(md) {
  function tokenize_return(tokens, idx) {
    var thinglinkId = md.utils.escapeHtml(tokens[idx].thinglinkId);
    var service = md.utils.escapeHtml(tokens[idx].service);
    if (thinglinkId === '') {
      return '';
    }

    if (service.toLowerCase() === 'thinglink') {
      return tokenize_thinglink(thinglinkId);
    }
    return ('');

  }

  return tokenize_return;
}

module.exports = function thinglink_plugin(md) {
  md.renderer.rules.interaction = tokenize_interaction(md);
  md.inline.ruler.before('emphasis', 'thinglink', thinglink_embed(md));
};
