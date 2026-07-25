// controllers/vendors.controller.js

export const getVendors = (req, res) => {
  const vendors = [
    {
      id: 1,
      name: "Proveedor de repuestos laptop"
    }
  ];

  return res.status(200).json(vendors);
};

export default 
  getVendors;
