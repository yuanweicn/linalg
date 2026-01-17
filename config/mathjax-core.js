window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],

    processEscapes: true,
    processEnvironments: true,
    tags: 'ams',

    macros: {
      // number fields
      Nb: "\\mathbb{N}",
      Zb: "\\mathbb{Z}",
      Rb: "\\mathbb{R}",
      Cb: "\\mathbb{C}",
      Qb: "\\mathbb{Q}",
      Pb: "\\mathbb{P}",
      Fb: "\\mathbb{F}",
      bk: "\\mathbb{k}",

      // bold letters for 2-categories
      BA: "\\mathbf{A}",
      BB: "\\mathbf{B}",
      BC: "\\mathbf{C}",
      BD: "\\mathbf{D}",
      BE: "\\mathbf{E}",
      BF: "\\mathbf{F}",
      BG: "\\mathbf{G}",
      BH: "\\mathbf{H}",
      BI: "\\mathbf{I}",
      BJ: "\\mathbf{J}",
      BK: "\\mathbf{K}",
      BL: "\\mathbf{L}",
      BM: "\\mathbf{M}",
      BN: "\\mathbf{N}",
      BO: "\\mathbf{O}",
      BP: "\\mathbf{P}",
      BQ: "\\mathbf{Q}",
      BR: "\\mathbf{R}",
      BS: "\\mathbf{S}",
      BT: "\\mathbf{T}",
      BU: "\\mathbf{U}",
      BV: "\\mathbf{V}",
      BW: "\\mathbf{W}",
      BX: "\\mathbf{X}",
      BY: "\\mathbf{Y}",
      BZ: "\\mathbf{Z}",

      // EuScript letters (mapped to mathscr)
      CA: "\\mathscr{A}",
      CB: "\\mathscr{B}",
      CC: "\\mathscr{C}",
      CD: "\\mathscr{D}",
      CE: "\\mathscr{E}",
      CF: "\\mathscr{F}",
      CG: "\\mathscr{G}",
      CH: "\\mathscr{H}",
      CI: "\\mathscr{I}",
      CJ: "\\mathscr{J}",
      CK: "\\mathscr{K}",
      CL: "\\mathscr{L}",
      CM: "\\mathscr{M}",
      CN: "\\mathscr{N}",
      CO: "\\mathscr{O}",
      CP: "\\mathscr{P}",
      CQ: "\\mathscr{Q}",
      CR: "\\mathscr{R}",
      CS: "\\mathscr{S}",
      CT: "\\mathscr{T}",
      CU: "\\mathscr{U}",
      CV: "\\mathscr{V}",
      CW: "\\mathscr{W}",
      CX: "\\mathscr{X}",
      CY: "\\mathscr{Y}",
      CZ: "\\mathscr{Z}"
    }
  },

  loader: {
    load: ['[tex]/ams']
  }
};
