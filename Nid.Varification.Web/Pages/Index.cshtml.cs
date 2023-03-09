using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Nid.Varification.Web.Models;
using Nid.Varification.Web.Services;

namespace Nid.Varification.Web.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<IndexModel> _logger;
        private readonly RestService _restService;
        [BindProperty]
        public User User { get; set; } = new User();
        public string htmlData { get; set; }
        
        public IndexModel(ILogger<IndexModel> logger,
            RestService restService,
            IConfiguration configuration)
        {
            _logger = logger;
            _restService = restService;
            _configuration = configuration;
        }

        public void OnGet()
        {

        }
        public async Task OnPostAsync()
        {
          var url = _configuration.GetValue<string>("NidServerUrl");
          var response =  await _restService.PostToApi(url, User);
            if (response.IsSuccessful)
            {
                var result = JsonConvert.DeserializeObject<responseData>(response.Content);
                if (result.success)
                {
                    htmlData = result.data;
                    // Get only table html
                    int firstStringPosition = htmlData.IndexOf("<table");
                    int secondStringPosition = htmlData.IndexOf("</table>");
                    htmlData = htmlData.Substring(firstStringPosition, secondStringPosition - firstStringPosition+8);
                }

            }

        }
        public class responseData
        {
            public bool success { get; set; }
            public string data { get; set; }
        }
    }
}