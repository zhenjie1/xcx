export const invoiceState = reactive({
  invoices: [] as Data[],
  title_data: {} as Data,
  email: '',
})

// export const invoiceState = {
//     "invoices": [
//         {
//             "id": 202,
//             "car_num": "蓝豫A0000",
//             "station_name": "13号收费口",
//             "money": "0.01",
//             "createtime": "2024-03-01 16:09:02",
//             "pay_type": 1,
//             "is_invoice": 1,
//             "check": true
//         },
//         {
//             "id": 203,
//             "car_num": "蓝豫A0000",
//             "station_name": "13号收费口",
//             "money": "0.01",
//             "createtime": "2024-03-01 16:10:47",
//             "pay_type": 1,
//             "is_invoice": 1,
//             "check": true
//         }
//     ],
//     "title_data": {"id": 12, "type": 1, "name": "公司科技", "tax_number": "1123312312123123"},
//     "email": "",
//     "title_id": ""
// }
