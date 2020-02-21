@smoke @regression
Feature: To be able to test balance REST API

  @api
  Scenario Outline: Verify that the balance API shows correct balances of the customer

    Given I set the expected balance in the mock server by specifying <Header> and <QueryParams> and <MockResponse>
    When I fetch the balance from Balance API by specifying <Header> and <QueryParams>
    Then I should get the response as per the API schema with status code as 200
    And the retrieved balance should match with the response from expected result file <ExpectedResult>

    Examples:
      | Header      | QueryParams      | MockResponse | ExpectedResult |
      | TC_1_Header | TC_1_QueryParams | TC_1_Mock    | TC_1_Response  |
      | TC_1_Header | TC_2_QueryParams | TC_2_Mock    | TC_2_Response  |
