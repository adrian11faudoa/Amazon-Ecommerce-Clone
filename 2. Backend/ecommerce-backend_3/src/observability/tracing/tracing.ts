/**
 * Minimal OpenTelemetry bootstrap, enabled only when OTEL_ENABLED=true.
 *
 * This must be imported and invoked before any other application module
 * (see main.ts) so auto-instrumentation can patch modules at load time.
 * Kept as a no-op fast path when disabled so this milestone does not
 * force an OTel collector dependency onto every environment.
 */
export async function initializeTracing(): Promise<void> {
  if (process.env.OTEL_ENABLED !== 'true') {
    return;
  }

  try {
    // Loaded dynamically so environments that don't enable OTel don't need
    // these packages installed at all.
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } =
      await import('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');

    const sdk = new NodeSDK({
      serviceName: process.env.OTEL_SERVICE_NAME ?? 'marketplace-backend',
      traceExporter: new OTLPTraceExporter({
        url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318'}/v1/traces`,
      }),
      instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    // eslint-disable-next-line no-console
    console.log('OpenTelemetry tracing initialized.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      'OTEL_ENABLED=true but OpenTelemetry packages are not installed. ' +
        'Install @opentelemetry/sdk-node, @opentelemetry/auto-instrumentations-node, ' +
        'and @opentelemetry/exporter-trace-otlp-http to enable tracing.',
    );
  }
}
