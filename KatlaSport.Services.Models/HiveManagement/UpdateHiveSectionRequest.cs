﻿namespace KatlaSport.Services.HiveManagement
{
    public class UpdateHiveSectionRequest
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the code.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the hive identifier.
        /// </summary>
        public int HiveId { get; set; }
    }
}
