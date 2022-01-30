using System;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using imageResizeTrigger.Services;

namespace imageResizeTrigger
{
    public class imageResizeTrigger
    {
        private readonly IImageResizer imageResizer;

        public imageResizeTrigger(IImageResizer imageResizer) 
        => this.imageResizer = imageResizer;

        [FunctionName("imageResizeTrigger")]
        public void Run(
            [BlobTrigger("origin/{name}")] Stream inputBlob, 
            [Blob("resized/{name}", FileAccess.Write)] Stream outputBlob,
            string name, 
            ILogger log)
        {
            log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {inputBlob.Length} Bytes");

            try
            {
                this.imageResizer.Resize(inputBlob, outputBlob);

                log.LogInformation("Reduced images saved to blob storage");

            }
            catch(Exception e)
            {   
                log.LogError("Resize fails",e);
            }
        }
    }
}
