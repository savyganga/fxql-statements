
export function transformFxqlEntries(records: any[]) {
    return records.map(record => {
      const mostRecentEntry = record.fxqlEntries[0];
  
      return {
        EntryId: record.id,
        SourceCurrency: record.sourceCurrency,
        DestinationCurrency: record.destinationCurrency,
        SellPrice: mostRecentEntry.sell,
        BuyPrice: mostRecentEntry.buy,
        CapAmount: mostRecentEntry.cap,
      };
    });
  }