using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

namespace OL.UI
{
    public partial class loadWFSMAP : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string url = "http://123.206.73.128:8080/geoserver/postgres/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=postgres:jinan_dijishi&maxFeatures=50&outputFormat=application%2Fjson";
            if (string.IsNullOrEmpty(url)) return;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.UserAgent = Request.UserAgent;
            request.ContentType = Request.ContentType;
            request.Method = Request.HttpMethod;
            byte[] trans = new byte[1024];
            int offset = 0;
            int offcnt = 0;

            if (request.Method.ToUpper() == "POST")
            {
                Stream nstream = request.GetRequestStream();
                while (offset < Request.ContentLength)
                {
                    offcnt = Request.InputStream.Read(trans, offset, 1024);
                    if (offcnt > 0)
                    {
                        nstream.Write(trans, 0, offcnt);
                        offset += offcnt;
                    }
                }
                nstream.Close();
            }
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //Encoding enc = Encoding.GetEncoding(65001);
            Response.ContentType = response.ContentType;
            StreamReader loResponseStream = new StreamReader(response.GetResponseStream());
            string lcHtml = loResponseStream.ReadToEnd();
            Response.Write(lcHtml);
            response.Close();
            loResponseStream.Close();

        }
    }
}