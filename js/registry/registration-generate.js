document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generate-pdf-btn").addEventListener("click", async () => {
    const { PDFDocument, rgb } = PDFLib;
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      gender: document.getElementById("gender").value,
      birthDate: document.getElementById("birthDate").value,
      idNumber: document.getElementById("idNumber").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      fcbCode: document.getElementById("fcbCode").value,
    };

    const existingPdfBytes = await fetch("files/Penya_Membership_Formular.pdf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];

    const fontSize = 12;
    const color = rgb(0, 0, 0);

    // PDF Positionen angepasst nach Screenshot (Pixelgeschätzt)
    page.drawText(formData.firstName,         { x: 130, y: 640, size: fontSize, color });
    page.drawText(formData.lastName,          { x: 130, y: 590, size: fontSize, color });
    page.drawText(formData.gender,            { x: 130, y: 540, size: fontSize, color });
    page.drawText(formData.birthDate,         { x: 130, y: 490, size: fontSize, color });
    page.drawText(formData.idNumber,          { x: 130, y: 440, size: fontSize, color });
    page.drawText(formData.address,           { x: 130, y: 390, size: fontSize, color });
    page.drawText(formData.email,             { x: 130, y: 340, size: fontSize, color });
    page.drawText(formData.phone,             { x: 130, y: 290, size: fontSize, color });
    page.drawText(formData.fcbCode,           { x: 130, y: 240, size: fontSize, color });
    /*page.drawText(formData.guardianSignature, { x: 130, y: 190, size: fontSize, color });*/

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Penya_Membership_Formular.pdf';
    link.click();
  });
});




function copyToClipboard(text, iconElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (iconElement) {
      iconElement.classList.remove("fa-copy");
      iconElement.classList.add("fa-check");
      setTimeout(() => {
        iconElement.classList.remove("fa-check");
        iconElement.classList.add("fa-copy");
      }, 1500);
    }
  });
}

