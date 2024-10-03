import ErrorLog from "#models/error_log";

// User access token chack
export const error_logs = async (filename: string, function_name: string, error:any) => {
      let error_message;
      if (typeof error === 'string') {
            error_message = error;
      } else {
            error_message = JSON.stringify(error);
      }
      const query = {
            error_filename: filename,
            function_name: function_name,
            error_message: error_message
      };
      await ErrorLog.create(query)
}