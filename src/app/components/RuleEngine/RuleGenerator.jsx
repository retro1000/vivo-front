import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useEffect } from "react";

const RuleGenerator = ({ currentRule, updateRule, discountCategory }) => {
  const [rule, setRule] = useState(
    currentRule || {
      expanded: true,
      anyOrAll: "Any",
      conditions: [
        { field: "Your meal preference", operator: "Is Not Empty", value: "" },
        { field: "Name", operator: "Contains", value: "" },
      ],
      actions: [{ type: "Thank you page", format: "Plain text", value: "" }],
      hasElseIf: false,
      elseIfRules: [],
      hasElse: false,
      elseActions: [],
    }
  );

  useEffect(() => {
    updateRule && updateRule(rule);
  }, [rule]);

  const fieldOptions = [
    "Your meal preference",
    "Name",
    "Email",
    "Phone",
    "Comments",
  ];

  const operatorOptions = [
    "Is Not Empty",
    "Is Empty",
    "Contains",
    "Does Not Contain",
    "Equals",
    "Does Not Equal",
    "Greater",
    "Greater Than Or Equal",
    "Less",
    "Less Than Or Equal",
  ];

  const actionTypeOptions = [
    "Thank you page",
    "Redirect to URL",
    "Send email",
    "Create record",
  ];

  const formatOptions = ["Plain text", "HTML", "Markdown"];

  const addCondition = (elseIfIndex = null) => {
    setRule((prev) => {
      if (elseIfIndex !== null) {
        const updatedElseIfRules = [...prev.elseIfRules];
        updatedElseIfRules[elseIfIndex] = {
          ...updatedElseIfRules[elseIfIndex],
          conditions: [
            ...updatedElseIfRules[elseIfIndex].conditions,
            { field: fieldOptions[0], operator: operatorOptions[0], value: "" },
          ],
        };
        return { ...prev, elseIfRules: updatedElseIfRules };
      } else {
        return {
          ...prev,
          conditions: [
            ...prev.conditions,
            { field: fieldOptions[0], operator: operatorOptions[0], value: "" },
          ],
        };
      }
    });
  };

  const removeCondition = (index, elseIfIndex = null) => {
    setRule((prev) => {
      if (elseIfIndex !== null) {
        const updatedElseIfRules = [...prev.elseIfRules];
        updatedElseIfRules[elseIfIndex] = {
          ...updatedElseIfRules[elseIfIndex],
          conditions: updatedElseIfRules[elseIfIndex].conditions.filter(
            (_, i) => i !== index
          ),
        };
        return { ...prev, elseIfRules: updatedElseIfRules };
      } else {
        return {
          ...prev,
          conditions: prev.conditions.filter((_, i) => i !== index),
        };
      }
    });
  };

  const updateCondition = (index, field, value, elseIfIndex = null) => {
    setRule((prev) => {
      if (elseIfIndex !== null) {
        const updatedElseIfRules = [...prev.elseIfRules];
        const updatedConditions = [
          ...updatedElseIfRules[elseIfIndex].conditions,
        ];
        updatedConditions[index] = {
          ...updatedConditions[index],
          [field]: value,
        };
        updatedElseIfRules[elseIfIndex] = {
          ...updatedElseIfRules[elseIfIndex],
          conditions: updatedConditions,
        };
        return { ...prev, elseIfRules: updatedElseIfRules };
      } else {
        const updatedConditions = [...prev.conditions];
        updatedConditions[index] = {
          ...updatedConditions[index],
          [field]: value,
        };
        return { ...prev, conditions: updatedConditions };
      }
    });
  };

  const addAction = (type = "when") => {
    setRule((prev) => {
      if (type === "otherwise") {
        return {
          ...prev,
          elseActions: [
            ...prev.elseActions,
            { type: actionTypeOptions[0], format: formatOptions[0], value: "" },
          ],
        };
      } else {
        return {
          ...prev,
          actions: [
            ...prev.actions,
            { type: actionTypeOptions[0], format: formatOptions[0], value: "" },
          ],
        };
      }
    });
  };

  const removeAction = (index, type = "when") => {
    setRule((prev) => {
      if (type === "otherwise") {
        return {
          ...prev,
          elseActions: prev.elseActions.filter((_, i) => i !== index),
        };
      } else {
        return {
          ...prev,
          actions: prev.actions.filter((_, i) => i !== index),
        };
      }
    });
  };

  const updateAction = (
    index,
    field,
    value,
    type = "when",
    elseIfIndex = null
  ) => {
    setRule((prev) => {
      if (type === "otherwise") {
        const updatedActions = [...prev.elseActions];
        updatedActions[index] = { ...updatedActions[index], [field]: value };
        return { ...prev, elseActions: updatedActions };
      } else if (type === "orwhen" && elseIfIndex !== null) {
        const updatedElseIfRules = [...prev.elseIfRules];
        const updatedActions = [...updatedElseIfRules[elseIfIndex].actions];
        updatedActions[index] = { ...updatedActions[index], [field]: value };
        updatedElseIfRules[elseIfIndex] = {
          ...updatedElseIfRules[elseIfIndex],
          actions: updatedActions,
        };
        return { ...prev, elseIfRules: updatedElseIfRules };
      } else {
        const updatedActions = [...prev.actions];
        updatedActions[index] = { ...updatedActions[index], [field]: value };
        return { ...prev, actions: updatedActions };
      }
    });
  };

  const updateRuleLogic = (value, elseIfIndex = null) => {
    setRule((prev) => {
      if (elseIfIndex !== null) {
        const updatedElseIfRules = [...prev.elseIfRules];
        updatedElseIfRules[elseIfIndex] = {
          ...updatedElseIfRules[elseIfIndex],
          anyOrAll: value,
        };
        return { ...prev, elseIfRules: updatedElseIfRules };
      } else {
        return { ...prev, anyOrAll: value };
      }
    });
  };

  const addElseIf = () => {
    setRule((prev) => ({
      ...prev,
      hasElseIf: true,
      elseIfRules: [
        ...prev.elseIfRules,
        {
          anyOrAll: "Any",
          conditions: [
            { field: fieldOptions[0], operator: operatorOptions[0], value: "" },
          ],
          actions: [
            { type: actionTypeOptions[0], format: formatOptions[0], value: "" },
          ],
        },
      ],
    }));
  };

  const removeElseIf = (elseIfIndex) => {
    setRule((prev) => {
      const updatedElseIfRules = prev.elseIfRules.filter(
        (_, i) => i !== elseIfIndex
      );
      return {
        ...prev,
        hasElseIf: updatedElseIfRules.length > 0,
        elseIfRules: updatedElseIfRules,
      };
    });
  };

  const addElse = () => {
    setRule((prev) => ({
      ...prev,
      hasElse: true,
      elseActions:
        prev.elseActions.length === 0
          ? [
              {
                type: actionTypeOptions[0],
                format: formatOptions[0],
                value: "",
              },
            ]
          : prev.elseActions,
    }));
  };

  const removeElse = () => {
    setRule((prev) => ({
      ...prev,
      hasElse: false,
    }));
  };

  // Render condition section (used for both When and Or When blocks)
  const renderConditions = (elseIfIndex = null) => {
    const conditions =
      elseIfIndex !== null
        ? rule.elseIfRules[elseIfIndex].conditions
        : rule.conditions;

    return conditions.map((condition, index) => (
      <Grid
        container
        spacing={2}
        alignItems="center"
        key={index}
        sx={{ mb: 1, ml: 2 }}
      >
        <Grid item xs={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Field</InputLabel>
            <Select
              value={condition.field}
              onChange={(e) =>
                updateCondition(index, "field", e.target.value, elseIfIndex)
              }
              label="Field"
            >
              {fieldOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Operator</InputLabel>
            <Select
              value={condition.operator}
              onChange={(e) =>
                updateCondition(index, "operator", e.target.value, elseIfIndex)
              }
              label="Operator"
            >
              {operatorOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={condition.value}
            onChange={(e) =>
              updateCondition(index, "value", e.target.value, elseIfIndex)
            }
            placeholder="Value"
          />
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => addCondition(elseIfIndex)}>
              <Add />
            </IconButton>
            {conditions.length > 1 && (
              <IconButton onClick={() => removeCondition(index, elseIfIndex)}>
                <Delete color="error" />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    ));
  };

  // Render actions section (used for When, Or When, and Otherwise blocks)
  const renderActions = (type = "when", elseIfIndex = null) => {
    let actions;

    if (type === "otherwise") {
      actions = rule.elseActions;
    } else if (type === "orwhen" && elseIfIndex !== null) {
      actions = rule.elseIfRules[elseIfIndex].actions;
    } else {
      actions = rule.actions;
    }

    return actions.map((action, index) => (
      <Grid
        container
        spacing={2}
        alignItems="center"
        key={index}
        sx={{ mb: 1, ml: 2 }}
      >
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={action.type}
              onChange={(e) =>
                updateAction(index, "type", e.target.value, type, elseIfIndex)
              }
              label="Type"
            >
              {actionTypeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>Format</InputLabel>
            <Select
              value={action.format}
              onChange={(e) =>
                updateAction(index, "format", e.target.value, type, elseIfIndex)
              }
              label="Format"
            >
              {formatOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            size="small"
            value={action.value}
            onChange={(e) =>
              updateAction(index, "value", e.target.value, type, elseIfIndex)
            }
            placeholder="(Maximum 100 characters)"
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={1}>
          {actions.length > 1 && (
            <IconButton onClick={() => removeAction(index, type)}>
              <Delete color="error" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    ));
  };

  return (
    <div>
      <Paper sx={{ mb: 2 }} elevation={0}>
        {rule.expanded && (
          <Box sx={{ p: 1 }}>
            {/* WHEN BLOCK */}
            <Box sx={{ mb: 3, pb: 3, borderBottom: 1, borderColor: "divider" }}>
              {discountCategory !== "PRODUCT_LEVEL" &&
                discountCategory !== "DISCOUNT_LEVEL" && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mr: 1 }}>
                      When
                    </Typography>
                    <FormControl
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 120, mr: 1 }}
                    >
                      <InputLabel>Match</InputLabel>
                      <Select
                        value={rule.anyOrAll}
                        onChange={(e) => updateRuleLogic(e.target.value)}
                        label="Match"
                      >
                        <MenuItem value="Any">Any</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="subtitle2">
                      of the following conditions are met
                    </Typography>
                  </Box>
                )}
              {discountCategory !== "PRODUCT_LEVEL" &&
                discountCategory !== "DISCOUNT_LEVEL" &&
                renderConditions()}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Perform the following actions
                </Typography>
                {renderActions()}
                <Button
                  variant="text"
                  startIcon={<Add />}
                  onClick={() => addAction()}
                >
                  Add Action
                </Button>
              </Box>
            </Box>
            {/* OR WHEN BLOCKS */}
            {rule.hasElseIf &&
              rule.elseIfRules.map((elseIfRule, elseIfIndex) => (
                <Box
                  key={elseIfIndex}
                  sx={{ mb: 3, pb: 3, borderBottom: 1, borderColor: "divider" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        Or When
                      </Typography>
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 120, mr: 1 }}
                      >
                        <InputLabel>Match</InputLabel>
                        <Select
                          value={elseIfRule.anyOrAll}
                          onChange={(e) =>
                            updateRuleLogic(e.target.value, elseIfIndex)
                          }
                          label="Match"
                        >
                          <MenuItem value="Any">Any</MenuItem>
                          <MenuItem value="All">All</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="subtitle2">
                        of the following conditions are met
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => removeElseIf(elseIfIndex)}
                    >
                      Remove
                    </Button>
                  </Box>
                  {renderConditions(elseIfIndex)}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Perform the following actions
                    </Typography>
                    {renderActions("orwhen", elseIfIndex)}
                    <Button
                      variant="text"
                      startIcon={<Add />}
                      onClick={() => {
                        const updatedRule = { ...rule };
                        updatedRule.elseIfRules[elseIfIndex].actions.push({
                          type: actionTypeOptions[0],
                          format: formatOptions[0],
                          value: "",
                        });
                        setRule(updatedRule);
                      }}
                    >
                      Add Action
                    </Button>
                  </Box>
                </Box>
              ))}
            {/* OTHERWISE BLOCK */}
            {rule.hasElse && (
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Otherwise</Typography>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => removeElse()}
                  >
                    Remove
                  </Button>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Perform the following actions
                  </Typography>
                  {renderActions("otherwise")}
                  <Button
                    variant="text"
                    startIcon={<Add />}
                    onClick={() => addAction("otherwise")}
                  >
                    Add Action
                  </Button>
                </Box>
              </Box>
            )}
            {/* ADD OR WHEN / OTHERWISE BUTTONS */}
            {discountCategory !== "PRODUCT_LEVEL" &&
              discountCategory !== "DISCOUNT_LEVEL" && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" onClick={addElseIf}>
                    + Add Or When
                  </Button>
                  {!rule.hasElse && (
                    <Button variant="outlined" onClick={addElse} sx={{ ml: 1 }}>
                      + Add Otherwise
                    </Button>
                  )}
                </Box>
              )}
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default RuleGenerator;
