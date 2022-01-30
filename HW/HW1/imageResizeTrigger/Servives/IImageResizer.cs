using System;
using System.IO;
using System.Collections.Generic;
using System.Text;

namespace imageResizeTrigger.Services
{
    public interface IImageResizer
    {
        void Resize(Stream input, Stream output);
    }
}
