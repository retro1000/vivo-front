import html2pdf from 'html2pdf.js';
import { useFormatter } from './useFormatter';

const useTemplate = () => {

    const { formatToLKR, DefaultDateFormat } = useFormatter()

    const invoiceTemplate = (order) => {
        return `
            <html>
                <head>
                    <title>Invoice</title>
                    <style>
                        body { font-family: Poppins, sans-serif; }
                        .container { padding: 20px; max-width: 800px; margin: 0 auto; }
                        .header {width: 100%; height: 80px; background: linear-gradient(135deg, #ff4d4d 45%, white 45%, white 50%, #333333 50%); display: flex; align-items: center; justify-content: space-between; color: white; }
                        .header h1 { margin: 0; font-size: 50px; }
                        label, p { margin: 0; font-size: 16px; color: #777 }
                        p {margin-bottom: 10px}
                        .invoice-details { margin-top: 20px; display: flex; justify-content: space-between; padding: 0 20px}
                        .invoice-details div { width: 45%; }
                        .invoice-details h2 { margin: 0 0 10px 0; font-size: 18px; color: #333; }
                        .invoice-details p { margin: 5px 0; font-size: 14px; }
                        .items { margin-top: 20px;  padding: 0 20px}
                        .items table { width: 100%; border-collapse: collapse; }
                        .items th, .items td { padding: 25px; text-align: center; font-size: 14px}
                        .items td { border-bottom: 1px solid #ddd; }
                        .items th { background-color: #ff4d4d; color: white; }
                        .total { margin-top: 20px; text-align: right; font-size: 18px; }
                        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #777; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin-left: 20px">INVOICE</h1>
                            <div style="margin-right: 20px">
                                <p style="color: white"><strong>Invoice No:</strong> ${order.id}</p>
                                <p style="color: white"><strong>Date:</strong> ${DefaultDateFormat(new Date(order.date))}</p>
                            </div>
                        </div>
                        <div class="invoice-details">
                            <div>
                                <h2>Invoiced To:</h2>
                                <p><strong>${order.customerName}</strong></p>
                                <p>${order.billingAddress}</p>
                            </div>
                        </div>
                        <div class="items">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item Description</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.items.map((item, index) => (`
                                    <tr>
                                        <td style="text-align: left; padding: 10px">
                                            <div style="display: flex; gap: 0.7em; align-items: ${item.type ? 'center' : 'flex-start'}">
                                                <img  src="${item.imageUrl}" style="width: 80px; border-radius: 8px; height: auto; flex: 0 0 auto; max-width:80px; max-height: 80px; min-width:50px; min-height: 50px;"/>
                                                <div style="flex: 1; display: flex; flex-direction: column; gap: 0.4em;">
                                                    <label style="font-size: 14px">${item.name}</label>
                                                    ${
                                                        item && item.attributes && item.attributes.length > 0 
                                                        ? item.attributes.map(attribute => (
                                                            `<div style="display: flex; gap: 1em">
                                                                <label style="font-weight: 600; font-size: 13px">${attribute.name} :</label>
                                                                <label style="font-size: 13px">${attribute.value}</label>
                                                            </div>`
                                                        )).join('')
                                                        : ''
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td style="color: #777">${formatToLKR(item.cost)}</td>
                                        <td style="color: #777">${item.quantity}</td>
                                        <td style="color: #777">${formatToLKR(item.totalCost)}</td>
                                    </tr>
                                    `)).join('')}
                                </tbody>
                            </table>
                        </div>
                        <br></br>
                        <div
                            style="
                                padding-right: 3;
                                gap: 20px;
                                padding: 0 20px;
                                display: flex; 
                                flex-direction: row;
                                align-items: flex-end;
                                justify-content: flex-end;"
                        >
                            <div
                                style="
                                    display: flex;
                                    align-items: flex-end;
                                    flex-direction: column;
                                    gap: 15px"
                            >
                                <label>Items Subtotal :</label>
                                <label>Fees :</label>
                                <label>Shipping :</label>
                                <label>Order Total :</label>
                            </div>
                            <div
                                style="
                                    display: flex;
                                    align-items: flex-end;
                                    flex-direction: column;
                                    gap: 15px"
                            >
                                <label>${formatToLKR(order.itemSubTotal)}</label>
                                <label>${formatToLKR(order.fees)}</label>
                                <label>${formatToLKR(order.delivery)}</label>
                                <label>${formatToLKR(order.itemSubTotal + order.fees + order.delivery)}</label>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Terms & Conditions: Authoritatively envisioned business action items through parallel.</p>
                            <p>NOTE: This is a computer-generated receipt and does not require a physical signature.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;
    }
    

    const packagingSlipTemplate = ( order ) => {
        return `
            <html>
                <head>
                    <title></title>
                    <style>
                    body { font-family: popins; sans-serif; }
                    .container { padding: 20px; max-width: 800px; margin: 0 auto; }
                    .header { text-align: center; background-color: #ff4d4d; padding: 10px 20px; color: white; }
                    .header h1 { margin: 0; font-size: 24px; }
                    .invoice-details { margin-top: 20px; display: flex; justify-content: space-between; }
                    .invoice-details div { width: 45%; }
                    .invoice-details h2 { margin: 0 0 10px 0; font-size: 18px; color: #333; }
                    .invoice-details p { margin: 5px 0; font-size: 14px; }
                    .items { margin-top: 20px; }
                    .items table { width: 100%; border-collapse: collapse; }
                    .items th; .items td { padding: 25px; text-align: center; }
                    .items th { background-color: #ff4d4d; color: white; }
                    .total { margin-top: 20px; text-align: right; font-size: 18px; }
                    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #777; }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <div class="header">
                        <h1>INVOICE</h1>
                    </div>
                    <div class="invoice-details">
                        <div>
                        <h2>Invoiced To:</h2>
                        <p><strong>${order.customerName}</strong></p>
                        <p>${order.billingAddress}</p>
                        </div>
                        <div>
                        <p><strong>Invoice No:</strong> ${order.id}</p>
                        <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="items">
                        <table>
                        <thead>
                            <tr>
                            <th>SL</th>
                            <th>Item Description</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map((item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                            `).join()}
                        </tbody>
                        </table>
                    </div>
                    <div class="total">
                        <p><strong>Sub Total:</strong> ${order.items.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}</p>
                        <p><strong>Tax:</strong> ${order.tax.toFixed(2)}</p>
                        <p><strong>Total:</strong> ${(order.items.reduce((total, item) => total + (item.quantity * item.price), 0) + order.tax).toFixed(2)}</p>
                    </div>
                    <div class="footer">
                        <p>Terms & Conditions: Authoritatively envisioned business action items through parallel.</p>
                        <p>NOTE: This is a computer-generated receipt and does not require a physical signature.</p>
                    </div>
                    </div>
                </body>
                </html>
        `;
    }

    const getBase64Image = (url) => {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous'; // Allow cross-origin images
            img.onload = () => {
                let canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                let dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = reject;
            img.src = url;
        });
    }
    
    const replaceImagesWithBase64 = async (element) => {
        let images = element.querySelectorAll('img');
        for (let img of images) {
            let base64Image = await getBase64Image(img.src);
            img.src = base64Image;
        }
    }

    const findType = (data, type) => {
        switch(type){
            case 'invoice':
                return invoiceTemplate(data)
            case 'packagin_slip':
                return packagingSlipTemplate(data)
        }
    }

    const printTemplate = (data, type) => {
        const printWindow = window.open();
        printWindow.document.open();
        printWindow.document.write(findType(data, type));
        printWindow.document.close();
        printWindow.print();
    }

    const downloadTemplate = async (data, type) => {
        const element = document.createElement('div');
        element.innerHTML = findType(data, type)
        await replaceImagesWithBase64(element)
        html2pdf().from(element).save(type+'.pdf');
    }
  
    return { printTemplate, downloadTemplate }
  }
  
  export { useTemplate }
  