import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { bussinesEmail } from "config";
import { bussinesContact } from "config";
import { startYear } from "config";

const faqs = [
  {
    question: "What products do you sell?",
    answer: "We sell a wide range of products including mobile accessories, shoes, clothes, and gift items.",
  },
  {
    question: "How long have you been in business?",
    answer: "We have been proudly serving our customers for nearly "+(new Date().getFullYear()-startYear)+" years.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only offer shipping within Sri Lanka. We are working towards expanding our services to international locations soon.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary based on your location. Typically, orders are delivered within 2-14 business days.",
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order is shipped, you will receive a tracking number via email to monitor the delivery status.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy on most items. Products must be in their original condition and packaging. Please refer to our Return Policy page for more details.",
  },
  {
    question: "How do I initiate a return or exchange?",
    answer: "To initiate a return or exchange, please contact our customer service team at "+bussinesEmail+" with your order details.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and other secure payment options.",
  },
  {
    question: "Is it safe to use my credit card on your website?",
    answer: "Yes, we use industry-standard encryption and secure payment gateways to ensure your information is safe and protected.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at "+bussinesEmail+" or call us at "+bussinesContact+". Our support hours are 8.00 am to 6.00 pm.",
  },
  {
    question: "Do you offer gift wrapping services?",
    answer: "Yes, we offer gift wrapping services for an additional fee. You can select this option at checkout.",
  },
  {
    question: "Do you offer warranties on your products?",
    answer: "Yes, many of our products come with manufacturer warranties. Please refer to the product description or contact us for more details.",
  },
  {
    question: "Can I find out if a product is in stock?",
    answer: "Our website is updated in real-time to reflect current stock levels. If an item is out of stock, you can sign up to be notified when it becomes available.",
  },
  {
    question: "Do you offer any discounts or promotions?",
    answer: "Yes, we regularly offer promotions and discounts. Sign up for our newsletter or follow us on social media to stay updated on the latest deals.",
  },
  {
    question: "Can I use multiple discount codes on a single purchase?",
    answer: "No, only one discount code can be applied per purchase.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/36523.jpg"
              alt="FAQ"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                position: "sticky",
                top: 20, // Adjust the top value as needed
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "rgba(170, 32, 94, 0.25)",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee4b55af2e5a815060aa45388753fab2a49793481b7de8794a3c7c5f6c89e9b5?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
                  alt="FAQ icon"
                  sx={{ width: 24, height: 24 }}
                />
              </Box>
              <Typography variant="subtitle1">FAQ Question</Typography>
            </Box>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Frequently asked questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  "&:before": { display: "none" },
                  boxShadow: "none",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQSection;
