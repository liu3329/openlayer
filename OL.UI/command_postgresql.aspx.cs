using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Npgsql;
using System.Data;
namespace OL.UI
{
    public partial class command_postgresql : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string point = Request.Form["point"];
            string[] pArray = point.Split(',');
            string x = pArray[0];
            string y = pArray[1];
            string s_point = "POINT("+x+" "+y+")";
            /* 用指定的connectionString，去实例化一个NpsqlConnection的对象*/
            string connectionString = "Server=123.206.73.128;Port=5432;User Id=postgres;Password=liu3522549;Database=gis";
            NpgsqlConnection conn = new NpgsqlConnection(connectionString);
            // 打开一个数据库连接，在执行相关SQL之前调用
            conn.Open();
            string sql = "SELECT * FROM jinan_dijishi WHERE ST_Intersects(jinan_dijishi.geom,ST_GeographyFromText('SRID=4326;" + s_point + "'))";
            DataSet ds = new DataSet();
            NpgsqlDataAdapter p_adapter = new NpgsqlDataAdapter(sql,conn);
            p_adapter.Fill(ds,"point");
            string response = ds.Tables["point"].Rows[0]["number"].ToString();
            conn.Close();
            Response.Write(response);

        }
    }
}