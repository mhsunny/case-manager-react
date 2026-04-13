import dayjs from "dayjs";

let casesDB = [
  {
    id: "WF-2026-10011",
    name: "Account Closure Request",
    dateCreated: "2026-04-09",
    type: "WLF Case",
    status: "Ready",
    assignedTo: "Michael Chen",
    priority: "Low",
    businessUnit: "000 - Home Office",
    dateUpdated: "2026-04-10",
    description: "Customer requesting to close savings account and transfer...",
  },
  {
    id: "WF-2026-10001",
    name: "Account Access Issue",
    dateCreated: "2026-04-08",
    type: "ITNE Case",
    status: "Pending",
    assignedTo: "John Smith",
    priority: "High",
    businessUnit: "000 - Home Office",
    dateUpdated: "2026-04-09",
    description: "Customer unable to access online banking account after re...",
    comments: []
  },
  {
    id: "WF-2026-10009",
    name: "Identity Theft Suspected",
    dateCreated: "2026-04-08",
    type: "MSE Case",
    status: "In Review",
    assignedTo: "Emily Rodriguez",
    priority: "High",
    businessUnit: "001 - Private Client Group",
    dateUpdated: "2026-04-10",
    description: "Identity theft suspected, multiple credit inquiries detected",
  },
  {
    id: "WF-2026-10002",
    name: "Transaction Dispute",
    dateCreated: "2026-04-07",
    type: "MSE Case",
    status: "In Review",
    assignedTo: "Sarah Johnson",
    priority: "High",
    businessUnit: "001 - Private Client Group",
    dateUpdated: "2026-04-10",
    description: "Unauthorized charge of $1,250 on debit card, customer req.",
  },
  {
    id: "WF-2026-10003",
    name: "Card Replacement Request",
    dateCreated: "2026-04-07",
    type: "WLF Case",
    status: "Pending",
    assignedTo: "Michael Chen",
    priority: "Medium",
    businessUnit: "072 - FINet",
    dateUpdated: "2026-04-08",
    description: "Customer lost wallet, requesting expedited replacement car.",
  },
  {
    id: "WF-2026-10010",
    name: "ATM Limit Increase",
    dateCreated: "2026-04-07",
    type: "ITNE Case",
    status: "Pending",
    assignedTo: "David Williams",
    priority: "Medium",
    businessUnit: "072 - FINet",
    dateUpdated: "2026-04-09",
    description: "Request to update mailing address and email on file",
  },
  {
    id: "WF-2026-10004",
    name: "Address Update",
    dateCreated: "2026-04-06",
    type: "ITC Case",
    status: "Ready",
    assignedTo: "Emily Rodriguez",
    priority: "Low",
    businessUnit: "000 - Home Office",
    dateUpdated: "2026-04-07",
    description: "Request to update mailing address and email on file",
  },
  {
    id: "WF-2026-10005",
    name: "Balance Discrepancy",
    dateCreated: "2026-04-06",
    type: "ITNE Case",
    status: "Pending",
    assignedTo: "David Williams",
    priority: "Medium",
    businessUnit: "001 - Private Client Group",
    dateUpdated: "2026-04-09",
    description: "Discrepancy in account balance after recent deposit",
  },
  {
    id: "WF-2026-10006",
    name: "Fraud Alert Investigation",
    dateCreated: "2026-04-05",
    type: "MSE Case",
    status: "In Review",
    assignedTo: "John Smith",
    priority: "High",
    businessUnit: "000 - Home Office",
    dateUpdated: "2026-04-10",
    description: "Suspicious activity detected on savings account, multiple w.",
  },
  {
    id: "WF-2026-10007",
    name: "Wire Transfer Delay",
    dateCreated: "2026-04-05",
    type: "WLF Case",
    status: "Pending",
    assignedTo: "Sarah Johnson",
    priority: "High",
    businessUnit: "072 - FINet",
    dateUpdated: "2026-04-08",
    description:
      "International wire transfer not received by recipient after 3",
  },
  {
    id: "WF-2026-10008",
    name: "Mortgage Inquiry",
    dateCreated: "2026-04-05",
    type: "ITC Case",
    status: "Ready",
    assignedTo: "Michael Chen",
    priority: "Medium",
    businessUnit: "001 - Private Client Group",
    dateUpdated: "2026-04-06",
    description: "Customer requesting information about mortgage refinanc.",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockCaseService = {
  getCases: async () => {
    await delay(800); // Simulate network latency
    return [...casesDB];
  },

  getCaseById: async (id) => {
    await delay(300);
    const found = casesDB.find((c) => c.id === id);
    if (!found) throw new Error("Case not found");
    return { ...found };
  },

  createCase: async (caseData) => {
    await delay(600);
    const newCase = {
      ...caseData,
      id: `WF-${dayjs().year()}-${Math.floor(10000 + Math.random() * 90000)}`,
      dateCreated: dayjs().format("YYYY-MM-DD"),
      dateUpdated: dayjs().format("YYYY-MM-DD"),
      status: caseData.status || "Ready",
      assignedTo: caseData.assignedTo || "Unassigned",
    };
    casesDB = [newCase, ...casesDB];
    return newCase;
  },

  updateCase: async (id, updateData) => {
    await delay(500);
    casesDB = casesDB.map((c) => {
      if (c.id === id) {
        return { ...c, ...updateData, dateUpdated: dayjs().format("YYYY-MM-DD") };
      }
      return c;
    });
    return casesDB.find((c) => c.id === id);
  },

  bulkUpdateCases: async (ids, updateData) => {
    await delay(800);
    casesDB = casesDB.map((c) => {
      if (ids.includes(c.id)) {
        return { ...c, ...updateData, dateUpdated: dayjs().format("YYYY-MM-DD") };
      }
      return c;
    });
    return true;
  },

  addCommentToCases: async (ids, commentData) => {
    await delay(600);
    casesDB = casesDB.map((c) => {
      if (ids.includes(c.id)) {
        const comments = c.comments || [];
        return {
          ...c,
          comments: [...comments, { ...commentData, date: dayjs().format() }],
          dateUpdated: dayjs().format("YYYY-MM-DD"),
        };
      }
      return c;
    });
    return true;
  },
};
