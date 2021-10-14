define(function() {
    function customLog(e) {
        if (e instanceof Error) {
            console.log(e.name, e.message, e.stack, e.fileNumber, e.lineNumber);
        } else {
          // SS Error
          console.log(
                      // SuiteScript Error
                      e.name,e.message,e.stack,e.id,e.cause
                    );
        }
    }
  return {};
});
