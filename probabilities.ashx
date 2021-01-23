<%@ WebHandler Language="C#" Class="Goldsmiths.ComputationalNeuroscience.Handler" %>

using System;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;

namespace Goldsmiths.ComputationalNeuroscience
{
	public class Handler : IHttpHandler
	{
		public void ProcessRequest(HttpContext context)
		{
			int id = 0;
			bool parsed = false;
			if (context.Request.HttpMethod != "POST")
			{
				throw new HttpException(404, "Probabilities.ashx invoked incorrectly");
			}

			if (context.Application["MScID"] == null)
			{
				context.Application["MScID"] = "0";
			}

			if (context.Request.Form["id"] != null)
			{
				id = Convert.ToInt32(context.Request.Form["id"]);
				parsed = true;
			}

			if (!parsed)
			{
				id = Convert.ToInt32(context.Application["MScID"]);
				id++;
				context.Application["MScID"] = Convert.ToString(id);
			}

			string outputJson = File.ReadAllText(context.Server.MapPath("probabilities.json"));
			// Could use a json parser to do this, we could use regex, but we'll use regular string replace.
			outputJson = outputJson.Replace("\"id\": 1,", string.Format("\"id\": {0},", id));

			context.Response.AppendHeader("Access-Control-Allow-Origin", "*");
			context.Response.ContentType = "application/json";
			context.Response.Write(outputJson);
		}

		public bool IsReusable { get { return false; } }
	}
}
