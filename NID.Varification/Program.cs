// See https://aka.ms/new-console-template for more information
using NID.Varification;
using RestSharp;

Console.WriteLine("Hello, World!");

var nidUser = new User
{
    mobile = "01743686865",
    dob = "1996-11-24",//Year-Month-Day,
    nid = "9560620222"
};

var service = new RestService();
var response = await service.PostToApi("https://ldtax.gov.bd/citizen/nidCheck/", nidUser);