import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register fonts
pdfMake.vfs = pdfFonts.vfs; 

const roundToTenth = (value) => {
  return (Math.round(value * 10) / 10).toFixed(2);
};

const formatDateForFilename = (dateStr) => {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0'); // MM
  const year = String(d.getFullYear()).slice(-2); // YY
  return `${month}-${year}`;
};

export const generateInvoicePDF = (invoice, company) => {
  const client = invoice.client;
  const totalTTC = invoice.designations.reduce((sum, d) => sum + d.amount, 0);
  const totalHT = invoice.tva ? roundToTenth(totalTTC / (1 + invoice.tva_rate / 100)) : totalTTC;
  const TVA = invoice.tva ? roundToTenth(totalTTC - totalHT) : 0.0;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Combine all designations into a single text with line breaks
  const designationsText = invoice.designations
    .map(d => {
      const dDate = new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      // Replace "à" with "->" for arrow style, to avoid rendering issues
      return `${dDate} : ${d.name} ${d.departure} -> ${d.arrival} ${d.b_f === "true" ? "A/R" : ""} ${d.amount}€`;
    })
    .join('\n');

  const docDefinition = {
    content: [
      { text: `Facture n°${invoice.id}`, style: 'header', alignment: 'right', background: '#808080' },

      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: company.name, style: 'companyName' },
              { text: company.adress },
              { text: `${company.postalCode} ${company.city}` },
              { text: `SIRET : ${company.siret}` ,fontSize: 13,bold: true},
              { text: company.email },
              { text: company.phone }
            ]
          },
          {
            width: '50%',
            stack: [
              {
                text: client.name
                  ? `${client.name} ${client.lastName}`
                  : client.incorporation,
                style: 'clientName'
              },
              { text: `${client.adress}, ${client.postalCode} ${client.city}` },
              { text: client.email }
            ],
            alignment: 'right'
          }
        ]
      },

      {
        margin: [0, 20, 0, 10],
        stack: [
          { text: `Date : ${formatDate(invoice.date)}`, bold: true },
          { text: `Intitulé : ${invoice.object}`, bold: true }
        ]
      },

      {
        style: 'tableExample',
        table: {
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Désignation', bold: true, fillColor: '#acacac' },
              { text: 'Quantité', bold: true, fillColor: '#acacac' },
              { text: 'Prix unitaire HT', bold: true, fillColor: '#acacac' },
              { text: 'Total HT', bold: true, fillColor: '#acacac' },
            ],
            [
              { text: designationsText, rowSpan: 1, margin: [0, 5, 0, 5] },
              { text: '1', rowSpan: 1, alignment: 'center' },
              { text: `${totalHT}€`, rowSpan: 1, alignment: 'right' },
              { text: `${totalHT}€`, rowSpan: 1, alignment: 'right' },
            ],
            [
              { text: '', border: [false, false, false, false] },
              { text: 'Montant total HT', colSpan: 2, alignment: 'left' },
              {},
              { text: `${totalHT}€`, alignment: 'right' },
            ],
            invoice.tva
              ? [
                  { text: '', border: [false, false, false, false] },
                  { text: `T.V.A ${invoice.tva_rate}%`, colSpan: 2, alignment: 'right' },
                  {},
                  { text: `${TVA}€`, alignment: 'right' },
                ]
              : [
                  { text: '', border: [false, false, false, false] },
                  {
                    text: 'T.V.A non applicable, art. 293 B du CGI',
                    colSpan: 2,
                    alignment: 'left',
                  },
                  {},
                  { text: '/', alignment: 'right' },
                ],
            [
              { text: '', border: [false, false, false, false] },
              { text: 'Total à payer', colSpan: 2, bold: true, alignment: 'left' },
              {},
              { text: `${totalTTC}€`, bold: true, alignment: 'right' },
            ],
          ],
        }
      },

      {
        text: invoice.greeting,
        margin: [0, 30, 0, 0],
        style: 'greeting',
        fontSize: 13,
        bold: true
      }
    ],

    styles: {
      header: {
        fontSize: 20,
        bold: true,
        marginBottom: 20
      },
      companyName: {
        fontSize: 14,
        bold: true
      },
      clientName: {
        fontSize: 14,
        bold: true,
        marginBottom: 5
      },
      tableExample: {
        margin: [0, 20, 0, 0]
      },
      greeting: {
        fontSize: 12,
        italics: true,
        whiteSpace: 'pre-line'
      }
    },

    defaultStyle: {
      fontSize: 11
    }
  };

  
  pdfMake.createPdf(docDefinition).download(
    `Facture_${invoice.object}_${formatDateForFilename(invoice.date)}.pdf`
  );
};
