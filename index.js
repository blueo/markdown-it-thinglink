// Process @[apester](apesterId)

'use strict';

function apester_embed(md) {
  function apester_return(state, silent) {
    /*eslint-disable no-unused-vars */
    var
    serviceEnd,
    serviceStart,
    apesterId = '',
    tokens,
    token;
    /*eslint-enable */

    // When we add more services, (apester) might be (apester|otherservice), for example
    var EMBED_REGEX = /@\[(apester)\]\([\s]*(.*?)[\s]*[\)]/im;


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
    apesterId = match[2];

    // If the apesterId field is empty, regex currently make it the close parenthesis.
    if (apesterId === ')') {
      apesterId = '';
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
      token.apesterId = apesterId;
      token.service = service;
      token.level = state.level;
    }

    state.pos = state.pos + state.src.indexOf(')');
    state.posMax = state.tokens.length;
    return true;
  }

  return apester_return;
}

function tokenize_apester(apesterId) {
  var embedStart = '<interaction id="';
  var embedEnd = '"></interaction>';
  return embedStart + apesterId + embedEnd;
}

function tokenize_interaction(md) {
  function tokenize_return(tokens, idx) {
    var apesterId = md.utils.escapeHtml(tokens[idx].apesterId);
    var service = md.utils.escapeHtml(tokens[idx].service);
    if (apesterId === '') {
      return '';
    }

    if (service.toLowerCase() === 'apester') {
      return tokenize_apester(apesterId);
    }
    return ('');

  }

  return tokenize_return;
}

module.exports = function apester_plugin(md) {
  md.renderer.rules.interaction = tokenize_interaction(md);
  md.inline.ruler.before('emphasis', 'apester', apester_embed(md));
};
