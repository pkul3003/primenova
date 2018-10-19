/**
filename: router.js
description: this defines an  express application called app and acts as a router for all incoming REST requests
from the client. The use of body-parser is must to read the contents of the incoming request json object.

methods supported:
http GET, http POST, http login, http logout
*/
'use strict';
console.log('Entering router.js...');
var express = require('express');
var config = require('./config.js');
var cors = require('cors');
var bodyParser = require("body-parser");
var apiAppointmentsController = require('./appointments/api/apptHandler.js');
var apiPatientController = require('./patients/api/patientHandler.js');
var apiStaffController = require('./staff/api/staffHandler.js');
var apiOcularController = require('./ocular/api/ocularHandler.js');
var apiGenericController = require('./generic/api/genericHandler.js');
var apiBillingController = require('./billing/api/billingHandler.js');


var appRouter = function(app) {

	// CORS-enabled for all origins!
	app.use(cors());

	// bodyParser for incoming json REST requests
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
  	});

// GET interfaces

// sample test interface to check if the server is working
app.get("/DaysOfWeek", function(req, res) {
	 var DaysOfWeek = config.DaysOfWeek;
	 res.send(DaysOfWeek);
});

// retrieve-appointments
app.get("/retrieve-appointments", async function(req, res) {
	await apiAppointmentsController.apiHandlerForAppointments(req, res);
});

// retrieve-appointments-by-date
app.get("/retrieve-appointments-by-date", async function(req, res) {
	await apiAppointmentsController.apiHandlerForAppointmentsByDate(req, res);
});

// retrieve-consultants
app.get("/retrieve-consultants", async function(req, res) {
	await apiStaffController.apiHandlerRetrieveConsultants(req, res);
});

// modes-of-payment
app.get("/retrieve-modes-of-payment", async function(req, res) {
	await apiBillingController.apiHandlerRetrieveModesOfPayment(req, res);
});

// complaint-types
app.get("/retrieve-complaint-types", async function(req, res) {
	await apiGenericController.apiHandlerRetrieveComplaintTypes(req, res);
});

// procedure or surgery types
app.get("/retrieve-procedure-types", async function(req, res) {
	await apiGenericController.apiHandlerRetrieveProcedureTypes(req, res);
});

// investigation types (optical or systemic)
app.get("/retrieve-investigation-types", async function(req, res) {
	await apiGenericController.apiHandlerRertrieveInvestigationTypes(req, res);
});

// special precaution types
app.get("/retrieve-special-precautions", async function(req, res){
	await apiGenericController.apiHandlerRetrieveSpecialPrecautions(req, res);
});

// seperate POST call for login function
app.post('/login', async function(req,res){
  console.log("insider router app.post/login: ", JSON.stringify(req.body.intentName));
  await apiStaffController.apiHandlerAuthenticateStaff(req, res);
});

app.post('/staff', async function(req,res){
	console.log("insider router app.post/staff: ", JSON.stringify(req.body.intentName));
	switch (req.body.intentName) {
		case 'retrieve-consultants':
			await apiStaffController.apiHandlerRetrieveConsultants(req, res);
			break;
		case 'create-new-staff':
			await apiStaffController.apiHandlerCreateStaff(req, res);
			break;		
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
		}
  });

app.post('/appointments', async function (req, res){
	console.log("inside router app.post/appointments: "+ JSON.stringify(req.body.intentName));

	switch (req.body.intentName) {
		case 'create-appointment':
			await apiAppointmentsController.apiHandlerCreateAppointment(req, res);
			break;
		case 'retrieve-appointments':
			await apiAppointmentsController.apiHandlerForAppointments(req, res);
			break;
		case 'retrieve-appointments-by-date':
			await apiAppointmentsController.apiHandlerForAppointmentsByDate(req, res);
			break;
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
	}
});

app.post('/patients', async function (req, res){
	console.log("inside router app.post/patients: "+ JSON.stringify(req.body.intentName));
	switch (req.body.intentName) {
		case 'create-patient':
			await apiPatientController.apiHandlerCreatePatient(req, res);
			break;
		case 'add-patient-address':
			await apiPatientController.apiHandlerAddPatientAddress(req, res);
			break;
		case 'search-patient':
			await apiPatientController.apiHandlerSearchPatient(req, res);
			break;
		case 'add-patient-medical-facts':
			await apiPatientController.apiHandlerAddMedicalFacts(req, res);
			break;
		case 'update-patient-medical-facts':
			await apiPatientController.apiHandlerUpdateMedicalFacts(req, res);
			break;
		case 'retrieve-patient-medical-facts':
			await apiPatientController.apiHandlerRetrieveMedicalFacts(req, res);
			break;
		case 'retrieve-patient-systemic-history':
			await apiPatientController.apiHandlerRetrieveSystemicHistory(req, res);
			break;
		case 'add-patient-systemic-history':
			await apiPatientController.apiHandlerAddSystemicHistory(req, res);
			break;
		case 'update-patient-progress-status' :
			await apiAppointmentsController.apiHandlerUpdatePatientProgressStatus(req, res);
			break;
		case 'add-patient-drug-allergies':
			await apiPatientController.apiHandlerAddPatientDrugAllergies(req, res);
			break;
		case 'retrieve-patient-systemic-surgical-history':
			await apiPatientController.apiHandlerRetrieveSurgicalHistory(req, res);
			break;		
		case 'add-patient-systemic-surgical-history':
			await apiPatientController.apiHandlerAddSurgicalHistory(req, res);
			break;
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
	}
});

app.post('/generic', async function(req, res){
	console.log("inside router app.post/generic: "+ JSON.stringify(req.body.intentName));
	switch (req.body.intentName) {
		case 'retrieve-systemic-complaint-types' :
			await apiGenericController.apiHandlerRetrieveSystemicComplaintTypes(req, res);
			break;
		case 'retrieve-surgery_types':
			await apiGenericController.apiHandlerRetrieveSurgeryTypes(req, res);
			break;
		case 'retrieve-surgery-sub-types':
			await apiGenericController.apiHandlerRetrieveSurgerySubTypes(req, res);
			break;
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
	}
});

app.post('/ocular', async function (req, res){
	console.log("inside router app.post/ocular: "+ JSON.stringify(req.body.intentName));
	switch (req.body.intentName) {
		case 'add-patient-ocular-facts':
			await apiOcularController.apiHandlerAddOcularFacts(req, res);
			break;
		case 'retrieve-patient-ocular-facts':
			await apiOcularController.apiHandlerRetrieveOcularFacts(req, res);
			break;
		case 'add-optometary-results':
			await apiOcularController.apiHandlerAddOptometeryResults(req, res);
			break;
		case 'retrieve-optometary-results':
			await apiOcularController.apiHandlerRetrieveOptometeryResults(req, res);
			break;
		case 'retrieve-previous-ocular-illness':
			await apiOcularController.apiHandlerRetrievePreviousOcularIllness(req, res);
			break;
		case 'add-previous-ocular-illness':
			await apiOcularController.apiHandlerAddPreviousOcularIllness(req, res);
			break;
		case 'retrieve-ocular-complaint-types' :
			await apiOcularController.apiHandlerRetrieveOcularComplaintTypes(req, res);
			break;
		case 'add-current-ocular-complaints':
			await apiOcularController.apiHandlerAddCurrentOcularComplaints(req, res);
			break;
		case 'add-consultant-examination-record':
			await apiOcularController.apiHandlerAddConsultantResults(req, res);
			break;
		case 'retrieve-patient-ocular-surgical-history':
			await apiOcularController.apiHandlerRetrieveSurgicalHistory(req, res);
			break;
		case 'add-patient-ocular-surgical-history':
			await apiOcularController.apiHandlerAddSurgicalHistory(req, res);
			break;		
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
	}
});

app.post('/billing', async function (req, res){
	console.log("inside router app.post/ocular: "+ JSON.stringify(req.body.intentName));
	switch (req.body.intentName) {
		case 'create-bill':
			await apiBillingController.apiHandlerCreatePatientBill(req, res);
			break;
		default:
			var returnJsonObj = {
				"msgtype" : "info",
				"message" : "Invalid intentName specified"
			}
			res.send(returnJsonObj);
		}
	});
}
module.exports = appRouter;
console.log('Exiting router.js...');
