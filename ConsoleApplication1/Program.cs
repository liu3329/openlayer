using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Npgsql;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            /* 用指定的connectionString，去实例化一个NpsqlConnection的对象*/
            string connectionString = "Server=123.206.73.128;Port=5432;User Id=postgres;Password=liu3522549;Database=gis";
            NpgsqlConnection conn = new NpgsqlConnection(connectionString);
            // 打开一个数据库连接，在执行相关SQL之前调用  
            conn.Open();
            string sql = "select count(*) from jinan_dijishi";  
            NpgsqlCommand npg_command = new NpgsqlCommand(sql,conn);
            int count = Convert.ToInt32(npg_command.ExecuteScalar());
            conn.Close();
            Console.WriteLine(count);
            Console.ReadKey();
        }
    }
}
