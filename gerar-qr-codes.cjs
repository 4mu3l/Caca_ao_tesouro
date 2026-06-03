// Gerador de QR Codes para o Caça ao Tesouro
// Use este script para gerar QR Codes únicos para cada questão ou estação

const QRCode = require('qrcode'); // npm install qrcode
const fs = require('fs');

// URL base do seu site (substitua pelo seu domínio real)
const BASE_URL = "https://caca-ao-tesouro-one.vercel.app";
// const BASE_URL = "https://caca-tesouro-senai.vercel.app";

// Quantidade de QR Codes para gerar (ex: 20 questões = 20 QR Codes)
const QUANTIDADE = 20;

// Pasta de saída
const OUTPUT_DIR = "./qr-codes";

// Criar pasta se não existir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

async function gerarQRCodes() {
  console.log("🏴‍☠️ Gerando QR Codes para Caça ao Tesouro...\n");

  for (let i = 1; i <= QUANTIDADE; i++) {
    const url = `${BASE_URL}/qr/${i}`;
    const filename = `${OUTPUT_DIR}/qr-code-${i}.png`;

    try {
      await QRCode.toFile(filename, url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#8B6914',   // Dourado escuro (temática)
          light: '#F5F0E1'   // Bege claro (fundo)
        }
      });

      console.log(`✅ QR Code ${i} gerado: ${url}`);
      console.log(`   Arquivo: ${filename}\n`);
    } catch (err) {
      console.error(`❌ Erro ao gerar QR Code ${i}:`, err);
    }
  }

  // Gerar QR Code principal (página inicial)
  const urlPrincipal = BASE_URL;
  const filenamePrincipal = `${OUTPUT_DIR}/qr-code-principal.png`;

  await QRCode.toFile(filenamePrincipal, urlPrincipal, {
    width: 500,
    margin: 2,
    color: {
      dark: '#2D1F0E',   // Marrom escuro
      light: '#F5F0E1'   // Bege claro
    }
  });

  console.log(`✅ QR Code PRINCIPAL gerado: ${urlPrincipal}`);
  console.log(`   Arquivo: ${filenamePrincipal}\n`);

  console.log("🎉 Todos os QR Codes foram gerados!");
  console.log(`📁 Local: ${OUTPUT_DIR}/`);
  console.log("\n💡 Dica: Imprima os QR Codes e espalhe pelo evento/escola!");
}

gerarQRCodes();