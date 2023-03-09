using Newtonsoft.Json;
using RestSharp;

namespace Nid.Varification.Web.Services
{
    public class RestService
    {
        public async Task<RestResponse> PostToApi(string path, object obj)
        {

            RestClient _client = new RestClient();

            RestRequest request = new RestRequest(path, Method.Post);

            request.AddJsonBody(JsonConvert.SerializeObject(obj).ToLower());

            RestResponse response = await _client.ExecuteAsync(request);

            return response;
        }
    }
}
