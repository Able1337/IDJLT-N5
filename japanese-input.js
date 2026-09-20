/* Shared romaji input; WanaKana is loaded locally. */
(function () {
  function bind(input) {
    // Keep the second n available for the next syllable: konni → こんに,
    // while nn alone still displays ん. WanaKana otherwise commits both n's.
    let carry = null, rememberN = false;
    input.addEventListener("input", event => {
      rememberN = false;
      if (event.isComposing) { carry = null; return; }
      if (carry && event.inputType === "insertText" && /^[aiueoy]$/i.test(event.data || "") &&
          input.value === carry.value.slice(0, carry.cursor) + event.data + carry.value.slice(carry.cursor)) {
        const cursor = input.selectionStart;
        input.value = input.value.slice(0, carry.cursor) + "n" + input.value.slice(carry.cursor);
        input.setSelectionRange(cursor + 1, cursor + 1);
      }
      rememberN = /nn$/i.test(input.value.slice(0, input.selectionStart));
      carry = null;
    });
    wanakana.bind(input, { IMEMode: "toHiragana" });
    input.addEventListener("input", () => {
      if (rememberN) carry = { value: input.value, cursor: input.selectionStart };
      rememberN = false;
    });
  }
  window.IDJLTInput = { bind, unbind(input) { if (input?.dataset.wanakanaId) wanakana.unbind(input); }, commit(input) { input.value = wanakana.toHiragana(input.value); return input.value; } };
})();
