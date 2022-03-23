const Agency = require("../models/agency.model");
const Client = require("../models/client.model");

var async = require("async");

exports.createAgencyAndClient = (req, res) => {
  let {
    agencyName,
    address1,
    address2,
    state,
    city,
    agencyPhoneNumber,
    clientName,
    clientEmail,
    clientPhoneNumber,
    totalBill,
  } = req.body;

  console.log("body", req.body);

  try {
    if (
      !agencyName ||
      !address1 ||
      !state ||
      !city ||
      !agencyPhoneNumber ||
      !clientName ||
      !clientEmail ||
      !clientPhoneNumber ||
      !totalBill
    ) {
      return res
        .status(422)
        .json({ status: "failed", message: "Missing required fields." });
    }
    let agency = new Agency({
      name: agencyName,
      address1,
      address2,
      state,
      city,
      phoneNumber: agencyPhoneNumber,
    });

    let client = new Client({
      name: clientName,
      email: clientEmail,
      phoneNumber: clientPhoneNumber,
      totalBill,
      agencyId: agency._id,
    });

    agency.clients.push(client._id);

    /**
     *Using async.parallel() in order to rollback if any one saved successully but other failed.
     *Another way is using session with trasaction which required db replica set.
     */
    async.parallel(
      [client.save.bind(client), agency.save.bind(agency)],
      function (error, result) {
        if (!error) {
          return res.status(200).json({
            status: "success",
            client: res.client,
            agency: res.agency,
            message: "Creating Agency and Client successful.",
          });
        } else {
          return res.status(500).json({
            status: "failed",
            message: "Creating Agency and Client failed.",
          });
        }
        // res is now equal to: {node:node, user:user}
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", error, message: "Error occured at server." });
  }
};

exports.updateClient = (req, res) => {
  try {
    if (!req.params.id) {
      return (
        res.status(422),
        json({ status: "failed", message: "Client Id missing." })
      );
    }

    Client.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
      (error, results) => {
        if (!error) {
          res
            .status(200)
            .json({ status: "success", message: "Client details updated." });
        } else {
          return res.status(500).json({
            status: "failed",
            message: "Client update failed.",
          });
        }
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error, message: "Error occured at server." });
  }
};

exports.getTopClient = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return (
        res.status(422),
        json({ status: "failed", message: "Agency Id missing." })
      );
    }
    let agency = await Agency.findOne({ _id: id }).populate("clients");

    if (!agency) {
      return res
        .status(404)
        .json({ status: "failed", message: "Agency not found." });
    }

    let sortedClients = await agency.clients.sort(
      (a, b) => a.totalBill - b.totalBill
    );
    let max = sortedClients ? sortedClients[0] : {};
    res.json({
      status: "success",
      AgencyName: agency.name,
      Clientname: max && max.name ? max.name : "",
      TotalBill: max && max.totalBill ? max.totalBill : "",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", error, message: "Error occured at server." });
  }
};
