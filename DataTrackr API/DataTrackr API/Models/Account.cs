﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataTrackr_Web_API.Models
{
    public class Account
    {
        [Key]
        public string Acc_email { get; set; }
        public double Acc_revenue { get; set; }

        public string Location { get; set; }

        public string name { get; set; }

        public string EstYear { get; set; }

        public string description { get; set; }        

        [ForeignKey(nameof(Customer_email))]
        public string Customer_email { get; set; }

        [ForeignKey(nameof(Customer_email))]
        public virtual Customer Customer { get; set; }

    }
}
