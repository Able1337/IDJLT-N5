using System;
using System.IO;
using System.Reflection;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using System.Threading;
using System.Windows.Forms;

internal static class Launcher
{
    [STAThread]
    private static int Main(string[] args)
    {
        bool test = Array.Exists(args, arg => arg == "--self-test");
        try
        {
            Application.EnableVisualStyles();
            string script;
            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("ticket-clicker.ps1"))
            using (var reader = new StreamReader(stream))
                script = reader.ReadToEnd();

            using (var runspace = RunspaceFactory.CreateRunspace())
            {
                runspace.ApartmentState = ApartmentState.STA;
                runspace.ThreadOptions = PSThreadOptions.UseCurrentThread;
                runspace.Open();
                using (var shell = PowerShell.Create())
                {
                    shell.Runspace = runspace;
                    shell.AddScript(script).AddParameter("SelfTest", test);
                    shell.Invoke();
                    if (shell.HadErrors)
                        throw new Exception(string.Join(Environment.NewLine, shell.Streams.Error));
                }
            }
            return 0;
        }
        catch (Exception error)
        {
            if (!test)
                MessageBox.Show(error.Message, "Ticket Clicker", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return 1;
        }
    }
}
