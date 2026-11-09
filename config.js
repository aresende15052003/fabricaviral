// =====================================================================
//  CONFIGURAÇÃO DO SITE — edite só este arquivo.
// =====================================================================
window.SITE_CONFIG = {
  // Link do checkout. Todos os botões com data-checkout usam este endereço.
  // ATENÇÃO: confirme na Wiapy que este link é seu e está ativo antes de
  // publicar ou rodar anúncios.
  checkoutUrl: "https://pay.wiapy.com/6af1c98904a3ce9b116dd270",

  // Repassa para o checkout os parâmetros com que o visitante chegou
  // (utm_source, utm_campaign, fbclid...). Só altera o link quando o
  // visitante chegou com algum deles.
  forwardParams: true,
  paramsToForward: [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "utm_id", "src", "sck", "fbclid", "gclid", "ttclid"
  ],

  // Rastreamento — deixe vazio ("") para desligar.
  // Antes de ligar, atualize a Política de Privacidade (item 4 diz hoje que
  // o site não usa pixels de anúncio).
  metaPixelId: "",        // ex.: "123456789012345"
  googleAnalyticsId: ""   // ex.: "G-XXXXXXXXXX"
};
